// Run the below script in the JS Console of Chrome while on the Better Education site.
// http://bettereducation.com.au/school/Primary/nsw/nsw_top_primary_schools.aspx
// It builds a JSON file and outputs it to the console. Then you have to copy and paste
// the outputted data into the 'cleanData.js' file as the schools variable. 

Array.prototype.forEach.call(document.querySelectorAll('tr > td:first-child > a[id^=ctl00_ContentPlaceHolder1_GridView1_]'),
  function(el) {
    console.log('{');
    var label = el.innerHTML,
      suburb = el.parentNode.nextSibling.querySelector('a').innerHTML,
      enrolments = el.parentNode.nextSibling.nextSibling.innerHTML,
      score = el.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.querySelector('a').innerHTML;
      
    console.log('"type": "' + (label.indexOf('Public School') > -1 ? 'PubSchool' : 'PrivSchool') + '",');
    console.log('"label": "' + label + '",');
    console.log('"suburb": "' + suburb + '",');
    console.log('"enrolments": ' + enrolments + ',');
    console.log('"score' + year + '":' + score);
    
    console.log('},');
});