(function(window) {
  'use strict';

  var qrcode = new window.QRCode(document.getElementById('code'), {
      width: 100,
      height: 100
  });

  function generateTransferCodeData(accNr, transferTitle, amount) {
      var country = 'PL';
      var recvName = '';
      var addon1, addon2, addon3 = 'PLN';

      var amountString = Math.floor(amount * 100);
      var pad = '000000';
      amountString = pad.substring(0, pad.length - amountString.length) + amountString;

      return '|' + country + '|' + accNr + '|' + amount * 100 + '|' + recvName + '|' + transferTitle + '|' + addon1 + '|' + addon2 + '|' + addon3;
  }

  function getText(fieldName) {
      return document.querySelector('input[name=' + fieldName + ']').value;
  }

  function generateTransferQrCode() {
      var accNr = getText('recvAccNr'),
      transferTitle = getText('title'),
      amount = getText('amount');

      var data = generateTransferCodeData(accNr, transferTitle, amount);

      qrcode.makeCode(data);
  }

  window.onload = function () {
    generateTransferQrCode();
  };

})(window);
