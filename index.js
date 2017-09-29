/* @flow */

import phantomjs from 'phantomjs-prebuilt';
import { remote } from 'webdriverio';
import { LOGIN_PAGE, TEST_PAGE } from './constant';

const wdOpts = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

const client = remote(wdOpts);

const { FEM_USER, FEM_PASS } = process.env;

phantomjs.run('--webdriver=4444')
  .then(program => {
    client
      .init()
      .url(LOGIN_PAGE)
      .setValue('#username', FEM_USER)
      .setValue('#password', FEM_PASS)
      .click('button[type=submit]')
      .url(TEST_PAGE);

    const title = client.getTitle();

    console.log(title);

    program.kill();
    client.end();
  })
  .catch(console.log);
