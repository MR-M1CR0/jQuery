$.ajax({
  url: 'https://reqres.in/api/users?page=2',
  method: 'GET',
  success: function (data, status, xhr) {
    if (xhr.status === 200) {
      // Successful response, process data
      $.each(data.data, function (_, item) {
        var newRow = $('<tr>');
        var idCell = $('<td>').text(item.id);
        var emailCell = $('<td>').text(item.email);
        var firstNameCell = $('<td>').text(item.first_name);
        var lastNameCell = $('<td>').text(item.last_name);
        var avatarCell = $('<td>').append(
          $('<img>').attr('src', item.avatar).attr('alt', 'Avatar')
        );

        newRow.append(
          idCell,
          emailCell,
          firstNameCell,
          lastNameCell,
          avatarCell
        );

        $('.table tbody').append(newRow);
      });
    } else {
      alert('Unexpected success status code:', xhr.status);
    }
  },
  error: function (xhr, status, error) {
    if (xhr.status === 404) {
      alert('Resource not found');
    } else if (xhr.status === 500) {
      alert('Internal server error');
    } else {
      alert('Unhandled error:', xhr.status, error);
    }
  },
});
