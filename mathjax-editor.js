let editor_area=document.getElementById('editor_area');
let preview=document.getElementById('preview');
let previous_html="";
let load_num=0;
let plain_text=localStorage.getItem('plain_text');
//console.log(plain_text);
$('#editor_area').val(plain_text);
preview_disp_scroll();

$(function () {
    let event_flag=0;
    marked.setOptions({
        // code要素にdefaultで付くlangage-を削除
        langPrefix: ''
        /*
        langPrefix: '',
        // highlightjsを使用したハイライト処理を追加
        highlight: function (code, lang) {
            return hljs.highlightAuto(code, [lang]).value
        }
        */
    });
    // 編集画面で何らかのキーが押されたとき
    $('#editor_area').keyup(function () {
        //let html = marked($(this).val());
        if( event_flag===0){
            event_flag=1;
            window.setTimeout(function(){
                event_flag=0;
                //preview_disp(); // スクロールは合わせない
                preview_disp_scroll(); // 編集される度にHTMLが作られるため、スクロールを合わせる必要がある
            }, 1000);
        }
    });
    /*
    $(window).keydown(function(e){
        if(event.shiftKey){
            if(e.keyCode === 13){
                $.post({
                    url: 'price_comparison_ajax.php',
                    data:{"blog-text": html},
                    dataType: 'json' //必須。json形式で返すように設定
                }).done(function(data){
            }
        }
    });
    */
    // スクロールしたとき
    editor_area.onscroll = function () {
        scroll_follow_up();
    };
});

// スクロールしたときにスクロール位置を合わせる
function scroll_follow_up(){
    let editorTop=editor_area.scrollTop; // editorのスクロールした位置の上部座標
    //let editorWindow=editor_area.clientHeight; // editorのウィンドウ（表示される枠）の高さ
    let editorHeight=editor_area.scrollHeight; // editorの全体の高さ
    //let previewTop=preview.contentWindow.pageYOffset; // iframeの場合のスクロールした位置の上部座標
    //let previewWindow=preview.contentWindow.innerHeight; // iframeのウィンドウ（表示される枠）の高さ
    let previewHeight=preview.contentDocument.documentElement.scrollHeight; // iframeの全体の高さ
    //console.log('editorのスクロールした位置の上部座標',editorTop);
    //console.log('editorの全体の高さ',editorHeight);
    //console.log('editorのウィンドウ（表示される枠）の高さ',editorWindow);
    //console.log('iframeのスクロールした位置の上部座標',previewTop);
    //console.log('iframeの全体の高さ',previewHeight);
    //console.log('iframeのウィンドウ（表示される枠）の高さ',previewWindow);

    //preview.contentWindow.scrollTo(0,previewHeight*(editorTop+editorWindow)/editorHeight-previewWindow); // 何％の高さのところにeditorのスクロールした位置がきているか
    preview.contentWindow.scrollTo(0,previewHeight*editorTop/editorHeight); // 何％の高さのところにeditorのスクロールした位置がきているか
}

// マークダウンをプレビュー画面に表示する
function preview_disp(){
    plain_text=$('#editor_area').val();
    let html = marked(plain_text);
    if(previous_html!=html){
        previous_html=html;
        load_num++;
        console.log("load_num:",load_num);
        localStorage.setItem('plain_text', plain_text);
        $.post({
            url: 'blog-text-save.php',
            data:{"blog_text": html},
            dataType: 'json' //必須。json形式で返すように設定
        }).done(function(data){
            document.getElementById("preview").contentWindow.location.reload();
            /*
            window.setTimeout(function(){
                scroll_follow_up(); // スクロールを合わせる
            }, 1000);
            */
        }).fail(function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
        })
    }
}
// マークダウンをプレビュー画面に表示し、スクロールを合わせる
function preview_disp_scroll(){
    preview_disp();
    window.setTimeout(function(){
        scroll_follow_up(); // スクロールを合わせる
    }, 1000);
}
/*
// セレクトファイルボタンがクリックされたとき
function slectfileClick() {
    $('#upfile_btn').addClass('bg-warning');
}
// アップロードボタンがクリックされたとき
function upfileClick() {
    let fileRef = document.getElementById('mdfile');
    //var outFrame = document.getElementById('output');
    if (1 <= fileRef.files.length) {
        let reader = new FileReader();
        reader.onload = function (theFile) {
            let file_text = theFile.target.result;
            //outhtml = outhtml.replace(/\r\n/g, '<br/>');
            $('#editor_area').val(file_text);
            preview_disp();
            //editor_area.innerHTML = outhtml; // reader.result;
            $('#upfile_btn').removeClass('bg-warning');
        }
        reader.readAsText(fileRef.files[0], "utf-8");
    }
}
*/
// ファイルの読み込み
function load_file(){
    let fileRef = document.getElementById('mdfile');
    //var outFrame = document.getElementById('output');
    if (1 <= fileRef.files.length) {
        let file = fileRef.files[0];
        let reader = new FileReader();
        reader.readAsText(file, "utf-8");
        reader.onload = function (theFile) {
            let file_text = theFile.target.result;
            //outhtml = outhtml.replace(/\r\n/g, '<br/>');
            $('#editor_area').val(file_text);
            preview_disp();
            //editor_area.innerHTML = outhtml; // reader.result;
            //$('#upfile_btn').removeClass('bg-warning');
        }
        //$('#reload-btn').css({'visibility': 'visible'}); // ファイル読み込みボタンを表示
    }
}
// 読み込みファイルの内容が変わったとき
$(function () {
    $('#mdfile').on('click',function(){
        this.value=null; // クリックしたときにファイル名を消すことで、再読み込み可能にする
    });
    $('#mdfile').change(function(){
        load_file();
    });
});

/*
// ファイル再読み込みボタンが押されたとき
$('#reload-btn').on('click', function(){
    let fileRef = document.getElementById('mdfile');
    //let temp=fileRef.value;
    //console.log(this.value);
    //this.value=null; // ファイル名を消すことで、再読み込み可能にする
    //console.log(temp);
    //fileRef.value=temp;
    load_file();
    //fileRef.value[0]=''; // ファイル名を消すことで、再読み込み可能にする
    console.log("ファイル読み込み")
});
*/
//$('[data-toggle="tooltip"]').tooltip();
//$.widget.bridge('uitooltip', $.ui.tooltip);
//$(target).find('[data-toggle="tooltip"]').tooltip();

let range = document.createRange();
let copyResult="";
setTimeout(function () {
    $('#copy-button')
    //$('[data-toggle="tooltip"]')
    // tooltip設定
    .tooltip({
        trigger: 'manual',
        placement:'right'
    })
    // tooltip表示後の動作を設定
    .on('shown.bs.tooltip', function(){
        setTimeout((function(){
            $(this).tooltip('hide');
        }).bind(this), 1500);
    })
    // クリック時の動作を設定
    .on('click', function(){
        //range = document.createRange();
        //range.selectNode(editor_area);
        //window.getSelection().addRange(range);
        editor_area.select();
        copyResult = document.execCommand('copy');
        //console.log(copyResult)
        // コピー結果によって表示変更
        if(copyResult){
            $('#copy-button').attr('data-bs-original-title', 'コピーしました');
        }else{
            $('#copy-button').attr('data-bs-original-title', 'コピー失敗しました');
        }
        // tooltip表示
        $(this).tooltip('show');
    });
}, 545*1.33); // 545ms timing to load jQuery.js + network estimated delay 
