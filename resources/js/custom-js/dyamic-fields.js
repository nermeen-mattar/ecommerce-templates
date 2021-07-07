(function() {
  const addressGroup =`<div class="form-group" style="position: relative;">
  <div class="row">
      <div class="col-lg-6 col-md-6">
          <div class="form_block">
              <label for="">Country: </label>
              <input name="country" class="form_field" type="text" placeholder="" value="" />
          </div>
      </div>

      <div class="col-lg-6 col-md-6">
          <div class="form_block">
              <label for="">City: </label>
              <input name="city" class="form_field" type="text" placeholder="" value="" />
          </div>
      </div>
      <div class="col-lg-6 col-md-6">
          <div class="form_block">
              <label for="">Address Line1: </label>
              <input name="address_line1" class="form_field" type="text" placeholder="" value="" />
          </div>
      </div>
      <div class="col-lg-6 col-md-6">
          <div class="form_block">
              <label for="">Address Line2: </label>
              <input name="address_line2" class="form_field" type="text" placeholder="" value=""/>
          </div>
      </div>

      <div class="col-lg-12 col-md-12">
          <div class="form_block">
              <label for="delivery_instructions">Delivery Instructions: </label>
              <input name="delivery_instructions" class="form_field" type="text" placeholder="" value=""/>
          </div>
      </div>
      <input class="d-none" name="address_id" class="form_field" type="text" placeholder="" value=""/>

  </div>
  <hr />
</div>`

  $(document).on('click', '.add_address', function(e) {
    var addresssList;
    e.preventDefault();
    addresssList = $('#address_form');
        // clone = examsList.children('.form-group:first').clone(true);
    // clone.removeAttr('id');
    // $(clone).removeClass('d-none');
    // clone.find('input').val('').attr('id', function() {
    //   return $(this).attr('id') + '_' + (examsList.children('.form-group').length + 1);
    // });
    return addresssList.children('.add_address').before(addressGroup); // was append
  });
}).call(this);