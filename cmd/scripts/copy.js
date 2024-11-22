const sharp = require('sharp');
const fs = require('node:fs');

// Define input and output directories
const inputDirectory = './dist';
const outputDirectory = './tmp';

fs.readdirSync(outputDirectory).forEach((file) => {
	const filePath = `${outputDirectory}/${file}`;

	// Check if the file is a directory
	if (fs.lstatSync(filePath).isDirectory()) {
		// Create the directory in the input directory
		const inputDirectoryPath = `${inputDirectory}/${file}`;
		if (!fs.existsSync(inputDirectoryPath)) {
			fs.mkdirSync(inputDirectoryPath);
		}

		// Read the files in the sub directory
		fs.readdirSync(filePath).forEach((subFile) => {
			const subFilePath = `${filePath}/${subFile}`;

			// Check if the file is an image
			if (subFile.match(/\.(jpg|jpeg|png)$/)) {
				// Copy the image
				// fs.copyFileSync(subFilePath, `${inputDirectoryPath}/${subFile}`);
				const fileStats = fs.statSync(subFilePath);
				const publicFileStats = fs.statSync(`${inputDirectoryPath}/${subFile}`);
				if (fileStats.size > publicFileStats.size) {
					return;
				} else {
					fs.copyFileSync(subFilePath, `${inputDirectoryPath}/${subFile}`);
				}

			}
		});

	}

});

// Delete the output directory
fs.rmSync(outputDirectory, {
	recursive: true
});