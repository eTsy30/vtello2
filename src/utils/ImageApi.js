import axios from 'axios';
// import config from '../config';

const getImages = async () => {
  const clientKey = 'HPWDMIL49P3JaHmuIayt9q8d-L3p6ROeoi89zfRQGVA'

  const page = Math.floor(Math.random() * 20 + 1);

  const urlImages = `https://api.unsplash.com/search/photos?page=${page}&query=Landscape&client_id=HPWDMIL49P3JaHmuIayt9q8d-L3p6ROeoi89zfRQGVA`;

  const res = await axios.get(urlImages);
  console.log(res);
  const photos = res.data.results.map((image) => ({
    id: image.id,
    thumb: image.urls.thumb,
    full: image.urls.full,
    user: {
      username: image.user.username,
      link: image.user.links.html,
    },
  }));
  return photos;
};

export { getImages };
