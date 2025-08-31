let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let draggedIndex = null;

    function saveList() {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function renderList() {
      const el = document.getElementById('wishlist');
      el.innerHTML = '';

      wishlist.forEach((item, index) => {
        const li = document.createElement('li');
        li.draggable = true;
        li.ondragstart = () => draggedIndex = index;
        li.ondrop = () => drop(null, index);

        const topRow = document.createElement('div');
        topRow.className = 'top-row';

        const name = document.createElement('div');
        name.innerText = item.name;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerText = 'X';
        delBtn.onclick = () => {
          wishlist.splice(index, 1);
          saveList();
          renderList();
        };

        topRow.appendChild(name);
        topRow.appendChild(delBtn);
        li.appendChild(topRow);

        const price = document.createElement('div');
        price.className = 'price-tag';
        price.contentEditable = true;
        price.innerText = item.price || 'Add price';
        price.onblur = () => {
          item.price = price.innerText;
          saveList();
        };

        li.appendChild(price);
        el.appendChild(li);
      });
    }

    function addItem() {
      const input = document.getElementById('wishlistInput');
      const value = input.value.trim();
      if (!value) return;

      wishlist.push({ name: value, price: '' });
      saveList();
      renderList();
      input.value = '';
    }

    function drop(e, dropIndex = null) {
      if (draggedIndex === null || dropIndex === null || draggedIndex === dropIndex) return;
      const draggedItem = wishlist.splice(draggedIndex, 1)[0];
      wishlist.splice(dropIndex, 0, draggedItem);
      draggedIndex = null;
      saveList();
      renderList();
    }

    renderList();