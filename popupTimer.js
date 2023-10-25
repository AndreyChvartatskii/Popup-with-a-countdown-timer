
    $("document").ready(function() {
        var remindPopup = $(".uc-remindPopup"); //Находим попап-напоминание
        const count = $('[field="tn_text_1676887725457"]');  
        var tCartObject = JSON.parse(localStorage.getItem("tcart")); 
        let cartCount = count.html();//количество товаров в копии корзины
        remindPopup.hide(); // Скрываем попап на странице
        if(tCartObject){ // если корзина не пустая
            var totalValue = tCartObject.total; //Количество товаров в корзине
            setInterval(function() { //Проверяем каждую секунду изменилось ли количество товаров в корзине
                var updatedTCartObject = JSON.parse(localStorage.getItem("tcart"));
                var updatedTotalValue = updatedTCartObject.total;
                if(cartCount === "0"){ //Если в копии корзины нет товаров прячем попап
                    remindPopup.hide();
                }
                if (updatedTotalValue !== totalValue) {
                    totalValue = updatedTotalValue;
                    document.cookie = 'cart_half_com=1; path=/; domain=icolorpmu.com; max-age=7200'; //Если количество изменилось добавляем в куки запись 1
                }
            }, 1000);
            //Если корзина не пустая и нет записей 1 и 2 в куки
            if (cartCount !== "0"  && totalValue !== 0  && document.cookie.search(/cart_full_com=1/) == -1 && document.cookie.search(/cart_half_com=1/) == -1) { 
                remindPopup.show();// Показываем попап
                // При нажатии на кнопку закрытия создаем запись 2 в куки и прячем попап
                $("[href='#closeRemindBtn']").click(function() {
                    document.cookie = 'cart_full_com=1; path=/; domain=icolorpmu.com; max-age=43200';
                    remindPopup.hide();
                });
            }
        }
    });
