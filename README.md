# Image Tagger
Select local image, preview it, tag it and post it for rotation

## To Run
Install [MongoDb](https://www.mongodb.org/downloads#production) (I've set MongoDB to run as a service)
'''npm install'''
'''npm start'''

## To Tag
'''Browse to http://localhost:4991/tagnewimage'''

## Rotation
'''Browse to http://localhost:4991'''

## TODO
- Use Socket.io to push rotation to client
- Decouple image display from acquisition of image data
- Use React components for UI
- Use a cool modern image presentation loop
- Allow the rotation to change based on new tag