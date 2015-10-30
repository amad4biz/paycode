(function(window) {
  'use strict';

  var RECV_ACC_NR = 'recvAccNr',
      RECV_NAME = 'recvName';
  var TITLE = 'title';
  var AMOUNT = 'amount';

  var QRCode = window.QRCode;

  var qrcode = new QRCode(document.getElementById('code'), {
      width: 500,
      height: 500,
      correctLevel: QRCode.CorrectLevel.H
  });

  var AMOUNT_PADDING = '000000';

  function generateTransferCodeData(accNr, recvName, transferTitle, amount) {
      var country = 'PL';
      var addon1 = '',
          addon2 = '',
          addon3 = 'PLN';

      var amountString = Math.floor(amount * 100).toString();
      amountString = AMOUNT_PADDING.substring(0, AMOUNT_PADDING.length - amountString.length) + amountString;

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
      var accNr = getText(RECV_ACC_NR).replace(/ /g, ''),
      transferTitle = getText(TITLE),
      recvName = getText(RECV_NAME),
      amount = getText(AMOUNT);

      var data = generateTransferCodeData(accNr, recvName, transferTitle, amount);

      qrcode.makeCode(data);
  }

  function getQuery() {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
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

  function setTextDecoded(fieldName, encVal) {
      var val = decodeURIComponent(encVal.replace(/\+/g, ' '));
      setText(fieldName, val);
  }

  function show(sel, dispVal) {
      document.querySelector(sel).style.display = dispVal || 'block';
  }

  function hide(sel, dispVal) {
      document.querySelector(sel).style.display = 'none';
  }

  window.onload = function () {
      var query = getQuery();
      if (!Object.keys(query).length) {
          return;
      }
      else {
          hide('form');
          hide('.marketing');
          show('.codewrap');
          show('.newCodeButton');
          setTextDecoded(RECV_ACC_NR, query[RECV_ACC_NR]);
          setTextDecoded(RECV_NAME, query[RECV_NAME]);
          setTextDecoded(TITLE, query[TITLE]);
          setTextDecoded(AMOUNT, query[AMOUNT]);
          generateTransferQrCode();
      }

  };

})(window);
