const sharp = require('sharp');
const fs = require('node:fs');

// Define input and output directories
const inputDirectory = './dist';
const outputDirectory = './tmp';


// Create the output directory if it doesn't exist

try {
	if (!fs.existsSync(outputDirectory)) {
		fs.mkdirSync(outputDirectory);
	}
} catch (err) {
	console.error(err);
}

// Define the compression settings
const quality = 80;
const maxWidth = 2500;
const maxHeight = 3000;

// Compress the images
// Read the files in sub directories
fs.readdirSync(inputDirectory).forEach((file) => {
	const filePath = `${inputDirectory}/${file}`;


	// Check if the file is a directory
	if (fs.lstatSync(filePath).isDirectory()) {
		// Create the directory in the output directory
		const outputDirectoryPath = `${outputDirectory}/${file}`;
		if (!fs.existsSync(outputDirectoryPath)) {
			fs.mkdirSync(outputDirectoryPath);
		}

		// Read the files in the sub directory
		fs.readdirSync(filePath).forEach((subFile) => {
			const subFilePath = `${filePath}/${subFile}`;

			// Check if the file is an image
			if (subFile.match(/\.(jpg|jpeg)$/)) {
				// Compress the image
				sharp(subFilePath)
					.resize(
						Math.min(maxWidth, maxHeight),
						Math.min(maxWidth, maxHeight), {
							fit: 'inside'
						}
					)
					.jpeg({
						quality: quality
					})
					.toFile(`${outputDirectoryPath}/${subFile}`);
			}
			// PNG files
			if (subFile.match(/\.(png)$/)) {
				// Compress the image
				sharp(subFilePath)
					.png({
						quality: quality,
						compressionLevel: 5,
					})
					.toFile(`${outputDirectoryPath}/${subFile}`);
			}

		});
	}

	// Check if the file is an image
	if (file.match(/\.(jpg|jpeg)$/)) {
		// Compress the image
		sharp(filePath)
			.resize(
				Math.min(maxWidth, maxHeight),
				Math.min(maxWidth, maxHeight), {
					fit: 'inside'
				}
			)
			.jpeg({
				quality: quality
			})
			.toFile(`${outputDirectory}/${file}`);
	}
	// PNG files
	if (file.match(/\.(png)$/)) {
		// Compress the image
		sharp(filePath)
			.png({
				quality: quality,
				compressionLevel: 5,
			})
			.toFile(`${outputDirectory}/${file}`);
	}

})