$(document).ready(function() {

  function ajaxCallRequest(f_method, f_url, f_data) {
    $("#dataSent").val(unescape(f_data));
    var f_contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    $.ajax({
      url: f_url,
      type: f_method,
      contentType: f_contentType,
      dataType: 'json',
      data: f_data,
      success: function(data) {
        var jsonResult = JSON.stringify(data);
        $("#results").val(unescape(jsonResult));
      },
    });
  }

  function joinArray(sku, quantity) {
    var len1 = sku.length;
    var len2 = quantity.length;
    if (len1 !== len2) {
      return;
    }

    var results = [];
    for (var i = 0; i < len1; i++) {
      var result = {};
      if (sku[i] === "" || quantity[i] === "")
        continue
      result['sku'] = sku[i].replace(/ /g,"");
      result['quantity'] = quantity[i];
      results.push(result);
    }

    return results;
  }

  $(document).on('click', '.btn-add', function(event) {
    event.preventDefault();
    var controlForm = $('.controls');
    //var currentEntry = $(this).parents('.entry:first');
    var currentEntry = $('#entry');
    var newEntry = $(currentEntry.clone()).appendTo('#container');
    newEntry.find('input').val('');
    // controlForm.find('.entry:not(:last) .btn-add')
    //         .removeClass('btn-add').addClass('btn-remove')
    //         .removeClass('btn-success').addClass('btn-danger')
    //         .html('<span class="glyphicon glyphicon-minus"></span>');

    var len = $('.controls').length;
    $(newEntry).find('[name=sku]')[0].name="sku" + (len-5)/2;
    $(newEntry).find('[name=quantity]')[0].name="quantity" + (len-5)/2;

    // var inputs = $('.controls .form-control .sku');
    // console.log("inputs:" + inputs)
    // $.each(inputs, function(index, item) {
    //   item.name = item.name + index;
    // });

    // var inputs = $('.controls .form-control .quantity');
    // $.each(inputs, function(index, item) {
    //   item.name = item.name + index;
    // });
  });

  $(document).on('click', '.btn-remove', function(event) {
    event.preventDefault();
    $(this).parents('.entry:first').remove();
    var inputs = $('.controls .form-control');
    $.each(inputs, function(index, item) {
      item.name = 'emails[' + index + ']';
    });
  });

  $(document).on('click', '.btn-remove', function(event) {
    e.preventDefault();
    alert('remove');
  });

  $("#sendPlainJSon").click(function(event) {
    event.preventDefault();
    var form = $('#ajaxForm');
    var method = form.attr('method');
    var url = form.attr('action') + '/get_order_price';
    var jsonQuantity = [];
    var jsonSku = [];

    $.each($(form).serializeArray(), function() {
      if (this.name.indexOf("sku") > -1) {
        jsonSku.push(this.value);
      }

      if (this.name.indexOf("quantity") > -1) {
        jsonQuantity.push(this.value);
      }
    });

    var data = JSON.stringify(joinArray(jsonSku, jsonQuantity));
    ajaxCallRequest(method, url, data);
  });
});
