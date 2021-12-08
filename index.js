const Client = require('ssh2-sftp-client');
const fs = require('fs');
const sftp = new Client();

const config = {
   host: 'sftpb.abbviemft.opentext.cloud',
   port: 10022,
   username: 'risr4533',
   password: 'Risrx123',
};

(async function main() {
   let response = await putItem(config, 'inbound', 'test20211130.txt');
   console.log(response);
})();

async function putItem(config, uploadDirectory, fileName) {
   try {
      let data = fs.createReadStream(`./${fileName}`);
      await sftp.connect(config);
      let pathExist = await sftp.exists(uploadDirectory);
      console.log('pathExist: ', pathExist);
      let response = '';

      if (pathExist != false) {
         let remote = `/${uploadDirectory}/${fileName}`;
         response = await sftp.put(data, remote);
      } else {
         response = `Dir: ${uploadDirectory} does not exist on SFTP Server!`;
      }
      sftp.end();
      return response;
   } catch (error) {
      sftp.end();
      console.log(error);
      throw error;
   }
}
