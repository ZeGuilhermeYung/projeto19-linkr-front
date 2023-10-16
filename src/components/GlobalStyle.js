import { createGlobalStyle } from 'styled-components';
 
export default createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  text-decoration: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input {
  all:unset;
}
textarea {
  all:unset;
}
button {
  all: unset;
  cursor: pointer;
}

///////// Global configuration //////////////

body {
  width: 100%;
  background-color: #333333;
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
h1 {
  color: #FFFFFF;
  font-family: 'Passion One';
  font-size: 49px;
  font-weight: 700;
  letter-spacing: 2.45px;
}
h2 {
  color: #FFFFFF;
  font-size: 43px;
  font-weight: 700;
}
h3 {
  color: #FFFFFF;
  font-size: 27px;
  font-weight: 700;
}
h4 {
  color: #FFFFFF;
  font-family: 'Lato';
  font-size: 19px;
}
h5 {
  color: #B7B7B7;
  font-family: 'Lato';
  font-size: 17px;
}
h6 {
  color: #FFFFFF;
  text-align: center;
  font-family: 'Lato';
  font-size: 11px;
}
::placeholder, ::-webkit-input-placeholder, :-webkit-autofill {
  font-size: 27px;
  font-weight: 700;
  color: #9F9F9F;
}
`;
 
