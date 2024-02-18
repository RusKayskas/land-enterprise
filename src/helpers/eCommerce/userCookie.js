export default () => {
  const matches = document.cookie.match(/__ddga_=([^;]*)/);
  return matches ? matches[1] : 'cookie not found';
};
