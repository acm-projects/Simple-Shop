# Simple-Shop
Web extension designed to determine the right clothing fit when shopping online using image-to-text recognition.

MVP
- User can enter their body measurements (whatever is applicable for most sizing charts)
- Can click on the extension when the sizing chart is pulled up and it will perform image to text recognition to match the user up to their correct size
- A pop-up will tell the user their correct size
- The user can edit measurements


Milestones
- Setup
	- Download IDE and/or any dependencies
	- Git/GitHub setup & understand how to make commits, push and pull requests
	- Understand the Web Extension
		- Understand what a web extension is and how to go about building one
		- Wireframes/design
		- Understand the purpose of the extension and have a general idea of how to go about building the web extension
- Front-end and Back-end
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

Resources
- Once the user clicks on a specific article of clothing and clicks on the extension, they will be told their size without having to click on the sizing chart
