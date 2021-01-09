import * as fs from 'fs';
import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';
import { parse as urlParse } from 'url';

export const download = (url: string, dest: any) => {
  return new Promise(function (resolve, reject) {
    const info = urlParse(url);
    const httpClient = info.protocol === 'https:' ? httpsGet : httpGet;
    const options = {
      host: info.host,
      path: info.path,
      headers: {
        'user-agent': 'WHAT_EVER',
      },
    };

    httpClient(options, (res: any) => {
      // check status code
      if (res.statusCode !== 200) {
        reject(
          new Error(
            'request to ' +
              url +
              ' failed, status code = ' +
              res.statusCode +
              ' (' +
              res.statusMessage +
              ')'
          )
        );
        return;
      }

      const file = fs.createWriteStream(dest);
      file.on('finish', function () {
        // close() is async
        file.close();
      });
      file.on('close', () => {
        resolve();
      });
      file.on('error', function (err: any) {
        // Delete the file async. (But we don't check the result)
        fs.unlinkSync(dest);
        reject(err);
      });

      res.pipe(file);
    })
      .on('error', function (err: any) {
        reject(err);
      })
      .end();
  });
};
