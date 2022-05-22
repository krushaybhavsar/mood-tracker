## Inspiration

Mental health disorders are a global issue. Just in the United States, almost 1 out of every 4 adults suffers from a mental health disorder. To tackle the issue of mental health, we created Mind Board, a virtual dashboard where users can monitor their mental health through the use of deep learning and statistical analysis to help them make informed decisions on how to improve their mental health. This not only helps people be more aware of themselves and what issues affect them but also provides them with a neat and organized way of doing so.

## What it does

Mind Board is a platform that allows users to track their daily mental health by providing text or video information on how different aspects of their day went. Users are able to enter mental health data daily where it is securely stored in a database for easy retrieval. Users can come back at any time and view entries from the previous day, regardless of whether the entry is a text or a video. Using deep learning and statistical analysis, users are provided a mental health score, depending on the data they provide on the website. In addition, users can view graphs of how their mental health scores have changed over time, alongside graphs of what factors contribute most to their mental health.

## How we built it

Mind Board was built using Python and ReactJS. React was used for the front-end with a Python Flask server running in the backend to handle server requests. Two deep learning models were developed. For sentiment analysis from text, a BERT, or Bidirectional Encoder Representations from Transformers, model was trained on more than 1,000,000 tweets using a TPU provided by Google Colaboratory. For sentiment analysis from videos, object detection was first performed using an SSD model followed by emotion recognition using the DeepFace library. Using React and Firebase to store user data, a website was built where users could record text or video data on different aspects of their day. HTTP requests would send this data to the backend Flask server where the data was fed into the appropriate models and the results sent back to the frontend application. React libraries were used to perform speech recognition to transcribe audio from videos into text for sentiment analysis by BERT. React was also used to develop charts that provided statistical analysis on user data.

## Challenges we ran into

One of the major challenges we ran into was training the BERT model. Given that we needed a high-accuracy model, BERT seemed like an excellent choice. However, we did not realize that training times would be extremely long - reaching up to 2 hours per epoch. To tackle this issue, we decided to train our model using a TPU provided by Google Colaboratory. Although we encountered several training issues due to this, with perseverance and meticulous searching, we were able to resolve all bugs, successfully training a BERT model on more than 1,000,000 tweets with high accuracy, reducing training times to only 5 minutes per epoch.

## Accomplishments that we're proud of

We're proud that we were able to integrate various deep learning models into our application. It was not easy to get models like BERT to work easily. However, after all our work, we are extremely proud of this accomplishment. We are also proud that we were able to use React to create an elegant and simple solution for users, preventing distractions while using the platform. Specifically, generating the charts and analysis of the data is something that we are proud of. Another accomplishment that we're proud of is how we were able to smoothly integrate a ReactJS frontend with Firebase and were able to exchange both authentication information and user data quickly and efficiently.

## What we learned

We learned that for future hackathons, we need to better plan out our time so that we can devote equal amounts of time to all aspects of the project. Looking back on how we spent our time, we can agree that we may have had a slightly more relaxed pace, though we had many ambitious ideas we wanted to work on. Later on in the hackathon, we began to realize that we were falling behind in terms of features that need to be completed.  Another thing we learned in this hackathon was how to collaborate virtually with one another. With the use of VSCode's LiveShare feature, we were able to edit each other's code files in real-time and share both servers and terminals with reading and writing capabilities. In the beginning, it was tough getting used to using the software and virtually collaborating. Over time, however, we learned to efficiently split up tasks and simultaneously work on different parts of the codebase.

## What's next for Mind Board

In the future, we hope to expand Mind Board by further developing the deep learning models used so that the models can identify user topics rather than asking users to talk about predefined topics. Through this, users will be given more freedom and will better be suited to identifying the underlying causes of their mental health issues. We also hope to add new features where users experiencing similar issues can be matched with each other to talk about their issues to help them resolve them. 
