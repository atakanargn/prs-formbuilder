var getJSON = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        return xhr.response;
      } else {
        return false;
      }
    };
    xhr.send();
};