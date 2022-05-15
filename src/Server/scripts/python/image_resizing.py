"""For an input image generates n scaled outputs of the input image.

Author:  Montserrat Delgado Alvarez
Version: 0.10.0

Generated images will have a '_suffix' (e.g. _s or _xs) depending on the arguments given to this script
Given the following arguments: ["ignored", "/MyImages/example.jpeg", "/MyImages/outputs", 200, "s", 48, "xs"]
The the image '/MyImages/example.jpeg' will be used (if exists) then two outputs will be generated 
'/MyImages/outputs/example_s.jpeg' and '/MyImages/outputs/example_xs.jpeg' where the maximun width ot height
will be 200 and 48 respectivel.

This script must have at least 3 args where:
	1. [Ignored] Name of the script file e.g. 'image_resizing.py'.
	2. [string]  Source image file name (in absolute path format).
	3. [string]  The output path (also absolute).

From the fourth args 2 must be provided, they represent each new size and its corresponding filesuffix.
	4. [integer] Image target size 1.
	5. [string]  Image file name suffix 1.
	6. [integer] Image target size 2.
	7. [string]  Image file name suffix 2.
	...

"""

from PIL import Image
import sys
import re

imagePath  = re.sub(r'\\+', "/", sys.argv[1])
outputPath = re.sub(r'\\+', "/", sys.argv[2])

fileNameParts = imagePath.split("/")[-1].split(".")
fileName      = fileNameParts[0]
extension     = fileNameParts[1]

inputImage = Image.open(imagePath)
inputImage = inputImage.convert("RGBA")
maxSize    = max(inputImage.width, inputImage.height)

i = 3;
while i < len(sys.argv) :
	# Generation of the small image.
	targetSize = int(sys.argv[i])

	resizeFactor = (1.0 * targetSize) / maxSize
	newSize      = (int(inputImage.width * resizeFactor), int(inputImage.height * resizeFactor))
	outputImage  = inputImage.resize(newSize, Image.LANCZOS)

	try:
		outputImage.save(outputPath + "/" + fileName + "." + extension)
	except Exception as e:
		outputImage = outputImage.convert("RGB")
		outputImage.save(outputPath + "/" + fileName + "." + extension)
	
	i += 2