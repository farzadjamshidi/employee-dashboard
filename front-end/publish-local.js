const copyPackagesLocally = require('copy-packages-locally');
const fs = require('fs');

const sourceDirectory = "./dist/ed/shared";

const destinationPathList = {
  main: './node_modules/@ed/shared'
};

/**
 * Should be delete in production mode
 */
Object.values(destinationPathList).forEach(destinationPath =>
{

  if (!fs.existsSync(destinationPath))
  {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
});

copyPackagesLocally.copyLocally(destinationPathList, sourceDirectory);
