    const btn_Add_card = document.getElementById('btn_Add_card')
    const Input_task = document.getElementById('Input_task')
    const _main = document.querySelector('main')
    const search = document.getElementById('search')
    btn_Add_card.addEventListener('click', () => {
        let tempVal = Input_task.value
        if (tempVal == '') {
            alert('لطفا تسک خود را وارد کنید!')
        } else {
            CreateTodo(tempVal)
            Input_task.value = ''
            Input_task.focus()
        }
    })
    function myCheck(s) {
        let title = s.parentElement.previousElementSibling.previousElementSibling.children[0].innerText
        s.checked ? s.parentElement.previousElementSibling.previousElementSibling.children[0].innerHTML = '<del>' + title + '</del>' : s.parentElement.previousElementSibling.previousElementSibling.children[0].innerHTML = title
    }
    function myDel(s) {
        if (confirm('آیا از پاک کردن تسک خود مطمئن هستین؟')) {
            let li = document.createElement('li')
            li.classList.add('list')
            li.innerHTML = '<b>' + s.parentElement.previousElementSibling.parentElement.children[0].innerText + '</b>' + `<span class='icon-undo _undo' onclick='_undo(this)'></span>`
            trash.append(li)
            //reset//
            s.parentElement.previousElementSibling.parentElement.remove()
            //reset//
        }
    }
    function myedit(s) {
        if (s.getAttribute('data-state') == 'off') {
            s.previousElementSibling.disabled = true;
            s.classList.remove('icon-edit')
            s.innerHTML = '<span class="icon-ok icon_center"></span>'
            s.dataset.state = 'on'
            //input and h2 //
            s.parentElement.previousElementSibling.previousElementSibling.classList.add('hide')
            s.parentElement.previousElementSibling.classList.remove('hide')
            s.parentElement.previousElementSibling.focus()
            // fill out input => h2 //
            s.parentElement.previousElementSibling.value = s.parentElement.previousElementSibling.previousElementSibling.children[0].innerText


        } else {
            s.previousElementSibling.disabled = false;
            s.innerHTML = '<span class="icon-edit icon_center"></span>'
            s.dataset.state = 'off'
            //input and h2 //
            s.parentElement.previousElementSibling.previousElementSibling.classList.remove('hide')
            s.parentElement.previousElementSibling.classList.add('hide')
            // fill out h2 => input //
            s.parentElement.previousElementSibling.previousElementSibling.children[0].innerText = s.parentElement.previousElementSibling.value
        }
    }
    function CreateTodo(tempVal) {
        const task = document.createElement('div')
        task.classList.add('task')
        task.innerHTML = `
            <div class="box_h2">
                    <h2 id='h2Element'>${tempVal}</h2>
                </div>
                <input type=text class='hide EditInput'>
                <div class="box_icons">
                    <input onchange='myCheck(this)' type="checkbox">
                    <span data-state='off' onclick='myedit(this)'class="icon-edit icon_center"></span>
                    <span onclick='myDel(this)' class="icon-trash-empty icon_center"></span>
                </div>
            `
        _main.appendChild(task)
    }
    function _undo(s) {
        if (confirm('آیا برای بازگرداندن تسک حذف شده مطمئن هستین؟')) {
            let temp = s.previousElementSibling.innerText
            CreateTodo(temp)
            s.parentElement.remove()
        }
    }
    search.addEventListener('keyup', (e) => {
        let searchval = e.target.value
        console.log(searchval);
        /// search /// 
        let tempH2 = document.querySelectorAll('.task h2')
        tempH2.forEach((val) => {
            if (val.innerText.includes(searchval)) {
                val.closest('.task').classList.remove('hide');
            } else {
                val.closest('.task').classList.add('hide');
            }
        })
    })
