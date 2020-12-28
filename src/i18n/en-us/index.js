/* eslint-disable camelcase */
// This is just an example,
// so you can safely delete all default props below

import routes from './routes'

const index = {
  title: 'Video Audio',
  confirmTitle: 'Confirm',
  confirmOk: 'OK',
  confirmCancel: 'Cancel',
  back: 'Back',

  setting: {
    settings: 'Settings',
    settingsDesc: 'Sys Settings',
    dayMode: 'Day mode',
    nightMode: 'Night mode',
    currentlyIn: 'Currently in',
    normalMode: 'Normal mode',
    fullScreenMode: 'Full screen mode',
    language: 'Language',
    zhSimple: 'Chinese (Simple)',
    enUs: 'English (US)'
  },

  actionVideo: {
    chooseFile: 'Choose video file',
    delVideo: 'Delete video',
    delVideoConfirm: 'Would you like to delete the video?',
    videoToAudio: 'Video to audio',
    downloadAudio: 'Download audio',
    failed: 'Video to audio failed',
    success: 'Video to audio was successful'
  },

  actionImages: {
    chooseFile: 'Choose images file',
    fileTotal: 'Total pictures: ',
    noFileError: 'Please select image file first',
    delImages: 'Delete images',
    delImagesConfirm: 'Would you like to delete the images?',
    imagesToVideo: 'Images to video',
    startImagesToVideo: 'Start images to video',
    stopImagesToVideo: 'Stop images to video',
    downloadVideo: 'Download video',
    intanceError: 'Initialization failed',
    failed: 'Images to video failed',
    success: 'Images to video was successful'
  }
}

export default {
  ...index,
  ...routes
}
