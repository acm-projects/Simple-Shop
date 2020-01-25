# Simple-Shop
Web extension designed to determine the right clothing fit when shopping online using image-to-text recognition.

## MVP
- User can enter their body measurements (whatever is applicable for most sizing charts)
- Can click on the extension when the sizing chart is pulled up and it will perform image to text recognition to match the user up to their correct size
- A pop-up will tell the user their correct size
- The user can edit measurements


## Milestones
- Setup
	- Download IDE and/or any dependencies
	- Git/GitHub setup & understand how to make commits, push and pull requests
	- Understand the Web Extension
		- Understand what a web extension is and how to go about building one
		- Wireframes/design
		- Understand the purpose of the extension and have a general idea of how to go about building the web extension
- Frontend
	- Display page for users to enter measurements
	- Sends size chart to the backend
	- A pop-up that tells user what size to purchase
- Backend
	- Receive size chart image
	- Determine if it is an image or text file
		- If an image, perform image to text recognition
		- If a text file, be able to parse text
	- Compare sizes with what user entered
	- Send correct size back to frontend

## Stretch Goals
- Allows user to customize sizing of outfits (arm length, height of shirt, etc)
- Compares sizes of similar article of clothings (either same or different website) 
- Once the user clicks on a specific article of clothing and clicks on the extension, they will be told their size without having to click on the sizing chart
- Uploads full body picture of user and user's sizes are automatically calculated

## Resources
- Technologies
	- HTML: standard markup language for documents designed to be displayed in a web browser
		- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Extension_pages

	- CSS: style sheet language used for describing the presentation
		- https://developer.mozilla.org/en-US/docs/Web/CSS/WebKit_Extensions
		- https://www.w3schools.com/css/

	- Javascript: object-oriented programming language
		- JavaScript API: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API

	- Other Helpful Links/Tutorials:
		- https://chrome.google.com/webstore/detail/ocr-image-reader/bhbhjjkcoghibhibegcmbomkbakkpdbo?hl=en
		- https://cloud.google.com/vision/docs/ocr#vision_set_endpoint-drest : Google Vision API

- About Web Extensions
	- https://developer.chrome.com/extensions/getstarted
	- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

- Inspiration:
	- Virtusize**: https://www.virtusize.com/site/
	- Sizer: https://sizer.me/technology/ (Resource for Stretch Goal)
	- MTailor: https://apps.apple.com/us/app/mtailor-custom-clothing/id816042916 (Mobile App)