(function(window) {
  'use strict';

  var RECV_ACC_NR = 'recvAccNr';
  var TITLE = 'title';
  var AMOUNT = 'amount';

  var qrcode = new window.QRCode(document.getElementById('code'), {
      width: 500,
      height: 500
  });

  function generateTransferCodeData(accNr, transferTitle, amount) {
      var country = 'PL';
      var recvName = '';
      var addon1 = '',
          addon2 = '',
          addon3 = 'PLN';

      var amountString = Math.floor(amount * 100);
      var pad = '000000';
      amountString = pad.substring(0, pad.length - amountString.length) + amountString;

      return '|' + country + '|' + accNr + '|' + amountString + '|' + recvName + '|' + transferTitle + '|' + addon1 + '|' + addon2 + '|' + addon3;
  }

  function getText(fieldName) {
      return document.querySelector('input[name=' + fieldName + ']').value;
  }

  function setText(fieldName, val) {
      if (!val) {
          return;
      }

      document.querySelector('input[name=' + fieldName + ']').value = val;
  }

  function generateTransferQrCode() {
      var accNr = getText(RECV_ACC_NR),
      transferTitle = getText(TITLE),
      amount = getText(AMOUNT);

      var data = generateTransferCodeData(accNr, transferTitle, amount);

      qrcode.makeCode(data);
  }

  function getQuery() {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      console.log(vars);
      var result = {};

      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          var key = decodeURIComponent(pair[0]);
          var val = decodeURIComponent(pair[1]);

          if (key && val) {
              result[key] = val;
          }
      }

      return result;
  }

  window.onload = function () {
      var query = getQuery();
      if (!Object.keys(query).length) {
          return;
      }
      else {
          setText(RECV_ACC_NR, query[RECV_ACC_NR]);
          setText(TITLE, query[TITLE]);
          setText(AMOUNT, query[AMOUNT]);
          generateTransferQrCode();
      }

  };

})(window);
