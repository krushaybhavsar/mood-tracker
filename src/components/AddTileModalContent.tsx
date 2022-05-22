import React, { useEffect, useRef, useState } from "react";
import { ReactElement } from "react";
import { ReactMediaRecorder, StatusMessages } from "react-media-recorder";
// import { addUserTile } from "../tools/firebaseTools";
import { storage, db } from "../firebase";
import { firebaseVideoURLtoScore, textToScore } from "../tools/serverTools";
import { NoteType, TileDataRaw } from "../types";
import "./AddTileModalContent.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type AddTileModalContentProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAddTileRefresher: React.Dispatch<React.SetStateAction<number>>;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  addTileRefresher: number;
  userID: string | undefined;
};

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return (
    <video
      ref={videoRef}
      autoPlay
      controls={false}
      className="nt-content-video"
      width={350}
      height={200}
    />
  );
};

const AddTileModalContent = (
  props: AddTileModalContentProps
): ReactElement<AddTileModalContentProps> => {
  const images = [
    "mood1.png",
    "mood2.png",
    "mood3.png",
    "mood4.png",
    "mood5.png",
  ];
  const reasons = [
    "Friends or Colleagues",
    "Personal Health",
    "Work",
    "Academics",
    "Family",
  ];

  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [selectedMood, setSelectedMood] = useState<number>(-1);
  const [selectedReason, setSelectedReason] = useState<number>(-1);
  const [stepNum, setStepNum] = useState<number>(1);
  const [notesMethod, setNotesMethod] = useState<NoteType>("text");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<string | undefined>();
  const [textNotes, setTextNotes] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleButton = async () => {
    if (stepNum === 1) {
      setStepNum(2);
    } else {
      if (props.userID) {
        const data: TileDataRaw = {
          date: new Date().toISOString(),
          tileScore: selectedMood,
          category: reasons[selectedReason],
          textNote: textNotes,
          videoNote: videoStream ? videoStream : "",
          noteType: notesMethod,
        };
        await addUserTile(props.userID, data).catch((error) => {
          console.log(error);
        });
        resetTranscript();
      }
    }
  };

  const addUserTile = async (userID: string, tileData: TileDataRaw) => {
    // if tiledata.noteType is video, then upload video to storage
    setLoading(true);
    if (tileData.noteType === "video") {
      await getFileBlob(tileData.videoNote, async (blob: any) => {
        await storage
          .ref(`${userID}/${tileData.date}`)
          .put(blob)
          .then(async function () {
            await storage
              .ref(`${userID}/${tileData.date}`)
              .getDownloadURL()
              .then(async function (url: string) {
                tileData.videoNote = url;
                await firebaseVideoURLtoScore(url, transcript)
                  .then(async (score: number) => {
                    tileData.tileScore = (tileData.tileScore + score) / 3;
                    await db
                      .collection("userData")
                      .doc(userID)
                      .collection("tiles")
                      .add(tileData)
                      .then(function (docRef: any) {
                        console.log("Tile added with ID: ", docRef.id);
                        setLoading(false);
                        props.setAddTileRefresher(props.addTileRefresher + 1);
                        props.setOpenModal(false);
                        setTimeout(() => {
                          props.setModalContent(<></>);
                        }, 300);
                      });
                  })
                  .catch(() => {});
              })
              .catch(function (error: any) {
                console.log(error);
              });
          });
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await textToScore(tileData.textNote)
        .then(async (score: number) => {
          tileData.tileScore = (tileData.tileScore + score) / 2;
          await db
            .collection("userData")
            .doc(userID)
            .collection("tiles")
            .add(tileData)
            .then(function (docRef: any) {
              console.log("Tile added with ID: ", docRef.id);
              setLoading(false);
              props.setAddTileRefresher(props.addTileRefresher + 1);
              props.setOpenModal(false);
              setTimeout(() => {
                props.setModalContent(<></>);
              }, 300);
            });
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    }
  };

  var getFileBlob = async function (url: string, cb: any) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function () {
      cb(xhr.response);
    });
    xhr.send();
  };

  const checkValidInput = () => {
    if (!loading) {
      if (stepNum === 1) {
        if (selectedMood !== -1 && selectedReason !== -1) {
          return true;
        }
        return false;
      } else {
        if (notesMethod === "text") {
          return textNotes !== "";
        } else {
          return videoStream;
        }
      }
    }
    return false;
  };

  const getStep1Content = () => {
    return (
      <>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">
            How were you feeling today?
          </h2>
          <div className="mood-images-container">
            {images.map((image, index) => (
              <img
                key={index}
                className={
                  "mood-image" + (index === selectedMood / 2 ? " selected" : "")
                }
                src={require(`../assets/${image}`)}
                alt="mood"
                onClick={() => setSelectedMood(images.indexOf(image) * 2)}
              />
            ))}
          </div>
        </div>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">
            Which of the following options most accurately describes the reason
            for this mood?
          </h2>
          <div className="reason-options-container">
            {reasons.map((reason, index) => (
              <p
                className={
                  "reason-option" +
                  (index === selectedReason ? " selected" : "")
                }
                key={index}
                onClick={() => setSelectedReason(reasons.indexOf(reason))}
              >
                {reason}
              </p>
            ))}
          </div>
        </div>
      </>
    );
  };

  const getVideoRenderComponent = (
    status: StatusMessages,
    previewStream: MediaStream | null,
    mediaBlobUrl: string | undefined
  ) => {
    if (status === "idle") {
      return;
    } else if (status === "recording") {
      return <VideoPreview stream={previewStream} />;
    } else if (status === "stopped") {
      setVideoStream(mediaBlobUrl);
      return (
        <video
          src={mediaBlobUrl}
          controls
          autoPlay
          loop
          className="nt-content-video"
          width={350}
          height={200}
        />
      );
    }
  };

  const getStep2Content = () => {
    return (
      <>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">
            Select a medium to express yourself in
          </h2>
          <div className="nt-content-notes-options-container">
            <p
              className={
                "nt-content-notes-option" +
                (notesMethod === "text" ? " selected" : "")
              }
              onClick={() => {
                setNotesMethod("text");
                setIsRecording(false);
                setVideoStream(undefined);
              }}
            >
              Text
            </p>
            <p
              className={
                "nt-content-notes-option" +
                (notesMethod === "video" ? " selected" : "")
              }
              onClick={() => {
                setNotesMethod("video");
                setTextNotes("");
              }}
            >
              Video
            </p>
          </div>
        </div>
        <div className="nt-content-container-item">
          <h2 className="nt-content-container-title">Describe your day</h2>
          {notesMethod === "text" ? (
            <textarea
              className="nt-content-notes-textarea"
              value={textNotes}
              onChange={(e) => setTextNotes(e.target.value)}
            />
          ) : (
            <ReactMediaRecorder
              video
              render={({
                startRecording,
                stopRecording,
                mediaBlobUrl,
                previewStream,
                status,
              }) => (
                <div className="nt-content-notes-video-container">
                  <>
                    <div className="nt-content-video-options">
                      <button
                        className="nt-content-video-option"
                        onClick={() => {
                          if (!isRecording) {
                            startRecording();
                            setIsRecording(true);
                            SpeechRecognition.startListening();
                          } else {
                            stopRecording();
                            setIsRecording(false);
                            SpeechRecognition.stopListening();
                          }
                        }}
                      >
                        {`${isRecording ? "Stop" : "Start"} Recording`}
                      </button>
                    </div>
                    {getVideoRenderComponent(
                      status,
                      previewStream,
                      mediaBlobUrl
                    )}
                  </>
                </div>
              )}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <h1>Add a New Tile</h1>
      <div className="nt-content-container">
        {stepNum === 1 ? getStep1Content() : getStep2Content()}
        <div className="nt-content-container-item">
          <button onClick={handleButton} disabled={!checkValidInput()}>
            {loading ? "Uploading..." : stepNum === 1 ? "Next" : "Add Tile"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTileModalContent;
