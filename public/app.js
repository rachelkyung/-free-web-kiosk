// Firebase 초기화
var firebaseConfig = {
    apiKey: "AIzaSyBfh78I8Cne24wj6VuSbeMiaNt2unbBgXQ",
    authDomain: "jotkka-444fd.firebaseapp.com",
    projectId: "jotkka-444fd",
    storageBucket: "jotkka-444fd.appspot.com",
    messagingSenderId: "318801488778",
    appId: "1:318801488778:web:e2bc584e30997d95787673",
    measurementId: "G-B8WYS1K5EC"
    //본인의 SDK입력
};
firebase.initializeApp(firebaseConfig);

// Firebase 데이터베이스 참조
var database = firebase.database();

// 주문 버튼 클릭 이벤트
document.getElementById('submitOrder').addEventListener('click', function() {
    var tableNumber = document.getElementById('tableNumber').value;
    var menu1 = document.getElementById('menu1').checked;
    var menu2 = document.getElementById('menu2').checked;
    var menu3 = document.getElementById('menu3').checked;
    var requests = document.getElementById('requests').value;

    // 선택한 메뉴를 기록
    var selectedMenus = [];
    if (menu1) selectedMenus.push("참치마요");
    if (menu2) selectedMenus.push("치킨데리야끼");
    if (menu3) selectedMenus.push("불닭콘치즈마요");

    if (!tableNumber) {
        alert("테이블 번호를 입력해주세요.");
        return;
    }

    if (selectedMenus.length === 0) {
        alert("최소 하나의 메뉴를 선택해주세요.");
        return;
    }

    // 데이터베이스에 저장할 주문 정보
    var order = {
        tableNumber: tableNumber,
        menu: selectedMenus,
        requests: requests,
        timestamp: new Date().toISOString()
    };

    // 데이터베이스에 주문 저장
    database.ref('orders/').push(order)
        .then(function() {
            document.getElementById('confirmationMessage').textContent = '주문이 완료되었습니다!';
            
            // 주문 완료 메시지 띄우기
            setTimeout(function() {
                alert("made by.경나윤");
            }, 500); // 0.5초 후 알림 띄우기
        })
        .catch(function(error) {
            console.error('주문 저장 중 오류 발생:', error);
        });
});
