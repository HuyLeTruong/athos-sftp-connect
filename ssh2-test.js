const { Client } = require('ssh2');

const conn = new Client();

conn.connect({
   host: 'sftpp.abbviemft.opentext.cloud',
   port: 10022,
   username: 'risr4533',
   password: 'Risrx123',
});

conn.on('ready', () => {
   console.log('-----Client :: ready-----');
   conn.sftp((err, sftp) => {
      if (err) throw err;
      sftp.readdir('/', (err, list) => {
         if (err) throw err;
         console.dir(list);
         conn.end();
      });
   });
});
