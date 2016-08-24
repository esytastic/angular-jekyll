var gmap;
var geocoder;
var marker = null;
var markers = [];
var vm_array;
var address_array;
var icon_url = '//images.gogoroapp.com/gostation/';
var icon1 = icon_url + "pin_GoS_0715.png";
var icon1_click = icon_url + "pin_GoS_on_0715.png"; /*hover icon */
var icon2 = icon_url + "pin_GoS_disable_0715.png";
var icon2_click = icon_url + "pin_GoS_on_0715.png";


var construction_array;




$(function () {
    getAddressData();
    mapInitialize();
    getVmData();
    searchbox();
    // getConstrution();

    $("#map_city").change(function () {
        var select_city_id = $(this).find(":selected").val();

        if (select_city_id != '0') {
            var district_array = null;
            for (var i = 0; i < address_array.Data.length; i++) {
                if (address_array.Data[i].Id == parseInt(select_city_id)) {
                    district_array = address_array.Data[i].District;
                    break;
                }
            }

            $("#map_district option").remove();
            $("#map_district").append($("<option></option>").attr("value", "0").text("請選擇"));
            for (var i = 0; i < district_array.length; i++) {
                $("#map_district").append($("<option></option>").attr("value", district_array[i].ChineseName).text(district_array[i].ChineseName));
            }
        } else {
            $("#map_district option").remove();
            $("#map_district").append($("<option></option>").attr("value", "0").text("請先選擇城市"));
        }
    });

    $("#map_district").change(function () {
        var select_city_text = $('#map_city').find(":selected").text();
        var select_district_id = $(this).find(":selected").val();
        if (select_district_id != '0') {
            var select_district = select_city_text + select_district_id;
            geocoder.geocode({ 'address': select_district }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    gmap.setCenter(results[0].geometry.location);
                } else {
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    });
});

function getAddressData() {
    // $.getJSON(address_api_url, function (data) {
        // address_array = data;
    // });
    // @FIXME: Get data from API
    address_array = {"Data":[{"Id":1,"ChineseName":"基隆市","EnglishName":"Keelung City","District":[{"Id":1,"ChineseName":"仁愛區","EnglishName":"Ren' ai Dist.","ZipCode":"200"},{"Id":2,"ChineseName":"信義區","EnglishName":"Xinyi Dist.","ZipCode":"201"},{"Id":3,"ChineseName":"中正區","EnglishName":"Zhongzheng Dist.","ZipCode":"202"},{"Id":4,"ChineseName":"中山區","EnglishName":"Zhongshan Dist.","ZipCode":"203"},{"Id":5,"ChineseName":"安樂區","EnglishName":"Anle Dist.","ZipCode":"204"},{"Id":6,"ChineseName":"暖暖區","EnglishName":"Nuannuan Dist.","ZipCode":"205"},{"Id":7,"ChineseName":"七堵區","EnglishName":"Qidu Dist.","ZipCode":"206"}]},{"Id":2,"ChineseName":"臺北市","EnglishName":"Taipei City","District":[{"Id":8,"ChineseName":"中正區","EnglishName":"Zhongzheng Dist.","ZipCode":"100"},{"Id":9,"ChineseName":"大同區","EnglishName":"Datong Dist.","ZipCode":"103"},{"Id":10,"ChineseName":"中山區","EnglishName":"Zhongshan Dist.","ZipCode":"104"},{"Id":11,"ChineseName":"松山區","EnglishName":"Songshan Dist.","ZipCode":"105"},{"Id":12,"ChineseName":"大安區","EnglishName":"Da' an Dist.","ZipCode":"106"},{"Id":13,"ChineseName":"萬華區","EnglishName":"Wanhua Dist.","ZipCode":"108"},{"Id":14,"ChineseName":"信義區","EnglishName":"Xinyi Dist.","ZipCode":"110"},{"Id":15,"ChineseName":"士林區","EnglishName":"Shilin Dist.","ZipCode":"111"},{"Id":16,"ChineseName":"北投區","EnglishName":"Beitou Dist.","ZipCode":"112"},{"Id":17,"ChineseName":"內湖區","EnglishName":"Neihu Dist.","ZipCode":"114"},{"Id":18,"ChineseName":"南港區","EnglishName":"Nangang Dist.","ZipCode":"115"},{"Id":19,"ChineseName":"文山區","EnglishName":"Wenshan Dist.","ZipCode":"116"}]},{"Id":3,"ChineseName":"新北市","EnglishName":"New Taipei City","District":[{"Id":20,"ChineseName":"萬里區","EnglishName":"Wanli Dist.","ZipCode":"207"},{"Id":21,"ChineseName":"金山區","EnglishName":"Jinshan Dist.","ZipCode":"208"},{"Id":22,"ChineseName":"板橋區","EnglishName":"Banqiao Dist.","ZipCode":"220"},{"Id":23,"ChineseName":"汐止區","EnglishName":"Xizhi Dist.","ZipCode":"221"},{"Id":24,"ChineseName":"深坑區","EnglishName":"Shenkeng Dist.","ZipCode":"222"},{"Id":25,"ChineseName":"石碇區","EnglishName":"Shiding Dist.","ZipCode":"223"},{"Id":26,"ChineseName":"瑞芳區","EnglishName":"Ruifang Dist.","ZipCode":"224"},{"Id":27,"ChineseName":"平溪區","EnglishName":"Pingxi Dist.","ZipCode":"226"},{"Id":28,"ChineseName":"雙溪區","EnglishName":"Shuangxi Dist.","ZipCode":"227"},{"Id":29,"ChineseName":"貢寮區","EnglishName":"Gongliao Dist.","ZipCode":"228"},{"Id":30,"ChineseName":"新店區","EnglishName":"Xindian Dist.","ZipCode":"231"},{"Id":31,"ChineseName":"坪林區","EnglishName":"Pinglin Dist.","ZipCode":"232"},{"Id":32,"ChineseName":"烏來區","EnglishName":"Wulai Dist.","ZipCode":"233"},{"Id":33,"ChineseName":"永和區","EnglishName":"Yonghe Dist.","ZipCode":"234"},{"Id":34,"ChineseName":"中和區","EnglishName":"Zhonghe Dist.","ZipCode":"235"},{"Id":35,"ChineseName":"土城區","EnglishName":"Tucheng Dist.","ZipCode":"236"},{"Id":36,"ChineseName":"三峽區","EnglishName":"Sanxia Dist.","ZipCode":"237"},{"Id":37,"ChineseName":"樹林區","EnglishName":"Shulin Dist.","ZipCode":"238"},{"Id":38,"ChineseName":"鶯歌區","EnglishName":"Yingge Dist.","ZipCode":"239"},{"Id":39,"ChineseName":"三重區","EnglishName":"Sanchong Dist.","ZipCode":"241"},{"Id":40,"ChineseName":"新莊區","EnglishName":"Xinzhuang Dist.","ZipCode":"242"},{"Id":41,"ChineseName":"泰山區","EnglishName":"Taishan Dist.","ZipCode":"243"},{"Id":42,"ChineseName":"林口區","EnglishName":"Linkou Dist.","ZipCode":"244"},{"Id":43,"ChineseName":"蘆洲區","EnglishName":"Luzhou Dist.","ZipCode":"247"},{"Id":44,"ChineseName":"五股區","EnglishName":"Wugu Dist.","ZipCode":"248"},{"Id":45,"ChineseName":"八里區","EnglishName":"Bali Dist.","ZipCode":"249"},{"Id":46,"ChineseName":"淡水區","EnglishName":"Tamsui Dist.","ZipCode":"251"},{"Id":47,"ChineseName":"三芝區","EnglishName":"Sanzhi Dist.","ZipCode":"252"},{"Id":48,"ChineseName":"石門區","EnglishName":"Shimen Dist.","ZipCode":"253"}]},{"Id":4,"ChineseName":"桃園市","EnglishName":"Taoyuan City","District":[{"Id":49,"ChineseName":"中壢區","EnglishName":"Zhongli Dist.","ZipCode":"320"},{"Id":50,"ChineseName":"平鎮區","EnglishName":"Pingzhen Dist.","ZipCode":"324"},{"Id":51,"ChineseName":"龍潭區","EnglishName":"Longtan Dist.","ZipCode":"325"},{"Id":52,"ChineseName":"楊梅區","EnglishName":"Yangmei Dist.","ZipCode":"326"},{"Id":53,"ChineseName":"新屋區","EnglishName":"Xinwu Dist.","ZipCode":"327"},{"Id":54,"ChineseName":"觀音區","EnglishName":"Guanyin Dist.","ZipCode":"328"},{"Id":55,"ChineseName":"桃園區","EnglishName":"Taoyuan Dist.","ZipCode":"330"},{"Id":56,"ChineseName":"龜山區","EnglishName":"Guishan Dist.","ZipCode":"333"},{"Id":57,"ChineseName":"八德區","EnglishName":"Bade Dist.","ZipCode":"334"},{"Id":58,"ChineseName":"大溪區","EnglishName":"Daxi Dist.","ZipCode":"335"},{"Id":59,"ChineseName":"復興區","EnglishName":"Fuxing Dist.","ZipCode":"336"},{"Id":60,"ChineseName":"大園區","EnglishName":"Dayuan Dist.","ZipCode":"337"},{"Id":61,"ChineseName":"蘆竹區","EnglishName":"Luzhu Dist.","ZipCode":"338"}]},{"Id":5,"ChineseName":"新竹市","EnglishName":"Hsinchu City","District":[{"Id":62,"ChineseName":"東區","EnglishName":"East Dist.","ZipCode":"300"},{"Id":63,"ChineseName":"北區","EnglishName":"North Dist.","ZipCode":"300"},{"Id":64,"ChineseName":"香山區","EnglishName":"Xiangshan Dist.","ZipCode":"300"}]},{"Id":6,"ChineseName":"新竹縣","EnglishName":"Hsinchu County","District":[{"Id":65,"ChineseName":"竹北市","EnglishName":"Zhubei City","ZipCode":"302"},{"Id":66,"ChineseName":"湖口鄉","EnglishName":"Hukou Township","ZipCode":"303"},{"Id":67,"ChineseName":"新豐鄉","EnglishName":"Xinfeng Township","ZipCode":"304"},{"Id":68,"ChineseName":"新埔鎮","EnglishName":"Xinpu Township","ZipCode":"305"},{"Id":69,"ChineseName":"關西鎮","EnglishName":"Guanxi Township","ZipCode":"306"},{"Id":70,"ChineseName":"芎林鄉","EnglishName":"Qionglin Township","ZipCode":"307"},{"Id":71,"ChineseName":"寶山鄉","EnglishName":"Baoshan Township","ZipCode":"308"},{"Id":72,"ChineseName":"竹東鎮","EnglishName":"Zhudong Township","ZipCode":"310"},{"Id":73,"ChineseName":"五峰鄉","EnglishName":"Wufeng Township","ZipCode":"311"},{"Id":74,"ChineseName":"橫山鄉","EnglishName":"Hengshan Township","ZipCode":"312"},{"Id":75,"ChineseName":"尖石鄉","EnglishName":"Jianshi Township","ZipCode":"313"},{"Id":76,"ChineseName":"北埔鄉","EnglishName":"Beipu Township","ZipCode":"314"},{"Id":77,"ChineseName":"峨眉鄉","EnglishName":"Emei Township","ZipCode":"315"}]},{"Id":7,"ChineseName":"苗栗縣","EnglishName":"Miaoli County","District":[{"Id":78,"ChineseName":"竹南鎮","EnglishName":"Zhunan Township","ZipCode":"350"},{"Id":79,"ChineseName":"頭份鎮","EnglishName":"Toufen Township","ZipCode":"351"},{"Id":80,"ChineseName":"三灣鄉","EnglishName":"Sanwan Township","ZipCode":"352"},{"Id":81,"ChineseName":"南庄鄉","EnglishName":"Nanzhuang Township","ZipCode":"353"},{"Id":82,"ChineseName":"獅潭鄉","EnglishName":"Shitan Township","ZipCode":"354"},{"Id":83,"ChineseName":"後龍鎮","EnglishName":"Houlong Township","ZipCode":"356"},{"Id":84,"ChineseName":"通霄鎮","EnglishName":"Tongxiao Township","ZipCode":"357"},{"Id":85,"ChineseName":"苑裡鎮","EnglishName":"Yuanli Township","ZipCode":"358"},{"Id":86,"ChineseName":"苗栗市","EnglishName":"Miaoli City","ZipCode":"360"},{"Id":87,"ChineseName":"造橋鄉","EnglishName":"Zaoqiao Township","ZipCode":"361"},{"Id":88,"ChineseName":"頭屋鄉","EnglishName":"Touwu Township","ZipCode":"362"},{"Id":89,"ChineseName":"公館鄉","EnglishName":"Gongguan Township","ZipCode":"363"},{"Id":90,"ChineseName":"大湖鄉","EnglishName":"Dahu Township","ZipCode":"364"},{"Id":91,"ChineseName":"泰安鄉","EnglishName":"Tai’an Township","ZipCode":"365"},{"Id":92,"ChineseName":"銅鑼鄉","EnglishName":"Tongluo Township","ZipCode":"366"},{"Id":93,"ChineseName":"三義鄉","EnglishName":"Sanyi Township","ZipCode":"367"},{"Id":94,"ChineseName":"西湖鄉","EnglishName":"Xihu Township","ZipCode":"368"},{"Id":95,"ChineseName":"卓蘭鎮","EnglishName":"Zhuolan Township","ZipCode":"369"}]},{"Id":8,"ChineseName":"臺中市","EnglishName":"Taichung City","District":[{"Id":96,"ChineseName":"中區","EnglishName":"Central Dist.","ZipCode":"400"},{"Id":97,"ChineseName":"東區","EnglishName":"East Dist.","ZipCode":"401"},{"Id":98,"ChineseName":"南區","EnglishName":"South Dist.","ZipCode":"402"},{"Id":99,"ChineseName":"西區","EnglishName":"West Dist.","ZipCode":"403"},{"Id":100,"ChineseName":"北區","EnglishName":"North Dist.","ZipCode":"404"},{"Id":101,"ChineseName":"北屯區","EnglishName":"Beitun Dist.","ZipCode":"406"},{"Id":102,"ChineseName":"西屯區","EnglishName":"Xitun Dist.","ZipCode":"407"},{"Id":103,"ChineseName":"南屯區","EnglishName":"Nantun Dist.","ZipCode":"408"},{"Id":104,"ChineseName":"太平區","EnglishName":"Taiping Dist.","ZipCode":"411"},{"Id":105,"ChineseName":"大里區","EnglishName":"Dali Dist.","ZipCode":"412"},{"Id":106,"ChineseName":"霧峰區","EnglishName":"Wufeng Dist.","ZipCode":"413"},{"Id":107,"ChineseName":"烏日區","EnglishName":"Wuri Dist.","ZipCode":"414"},{"Id":108,"ChineseName":"豐原區","EnglishName":"Fengyuan Dist.","ZipCode":"420"},{"Id":109,"ChineseName":"后里區","EnglishName":"Houli Dist.","ZipCode":"421"},{"Id":110,"ChineseName":"石岡區","EnglishName":"Shigang Dist.","ZipCode":"422"},{"Id":111,"ChineseName":"東勢區","EnglishName":"Dongshi Dist.","ZipCode":"423"},{"Id":112,"ChineseName":"和平區","EnglishName":"Heping Dist.","ZipCode":"424"},{"Id":113,"ChineseName":"新社區","EnglishName":"Xinshe Dist.","ZipCode":"426"},{"Id":114,"ChineseName":"潭子區","EnglishName":"Tanzi Dist.","ZipCode":"427"},{"Id":115,"ChineseName":"大雅區","EnglishName":"Daya Dist.","ZipCode":"428"},{"Id":116,"ChineseName":"神岡區","EnglishName":"Shengang Dist.","ZipCode":"429"},{"Id":117,"ChineseName":"大肚區","EnglishName":"Dadu Dist.","ZipCode":"432"},{"Id":118,"ChineseName":"沙鹿區","EnglishName":"Shalu Dist.","ZipCode":"433"},{"Id":119,"ChineseName":"龍井區","EnglishName":"Longjing Dist.","ZipCode":"434"},{"Id":120,"ChineseName":"梧棲區","EnglishName":"Wuqi Dist.","ZipCode":"435"},{"Id":121,"ChineseName":"清水區","EnglishName":"Qingshui Dist.","ZipCode":"436"},{"Id":122,"ChineseName":"大甲區","EnglishName":"Dajia Dist.","ZipCode":"437"},{"Id":123,"ChineseName":"外埔區","EnglishName":"Waipu Dist.","ZipCode":"438"},{"Id":124,"ChineseName":"大安區","EnglishName":"Da' an Dist.","ZipCode":"439"}]},{"Id":9,"ChineseName":"彰化縣","EnglishName":"Changhua County","District":[{"Id":125,"ChineseName":"彰化市","EnglishName":"Changhua City","ZipCode":"500"},{"Id":126,"ChineseName":"芬園鄉","EnglishName":"Fenyuan Township","ZipCode":"502"},{"Id":127,"ChineseName":"花壇鄉","EnglishName":"Huatan Township","ZipCode":"503"},{"Id":128,"ChineseName":"秀水鄉","EnglishName":"Xiushui Township","ZipCode":"504"},{"Id":129,"ChineseName":"鹿港鎮","EnglishName":"Lukang Township","ZipCode":"505"},{"Id":130,"ChineseName":"福興鄉","EnglishName":"Fuxing Township","ZipCode":"506"},{"Id":131,"ChineseName":"線西鄉","EnglishName":"Xianxi Township","ZipCode":"507"},{"Id":132,"ChineseName":"和美鎮","EnglishName":"Hemei Township","ZipCode":"508"},{"Id":133,"ChineseName":"伸港鄉","EnglishName":"Shengang Township","ZipCode":"509"},{"Id":134,"ChineseName":"員林鎮","EnglishName":"Yuanlin Township","ZipCode":"510"},{"Id":135,"ChineseName":"社頭鄉","EnglishName":"Shetou Township","ZipCode":"511"},{"Id":136,"ChineseName":"永靖鄉","EnglishName":"Yongjing Township","ZipCode":"512"},{"Id":137,"ChineseName":"埔心鄉","EnglishName":"Puxin Township","ZipCode":"513"},{"Id":138,"ChineseName":"溪湖鎮","EnglishName":"Xihu Township","ZipCode":"514"},{"Id":139,"ChineseName":"大村鄉","EnglishName":"Dacun Township","ZipCode":"515"},{"Id":140,"ChineseName":"埔鹽鄉","EnglishName":"Puyan Township","ZipCode":"516"},{"Id":141,"ChineseName":"田中鎮","EnglishName":"Tianzhong Township","ZipCode":"520"},{"Id":142,"ChineseName":"北斗鎮","EnglishName":"Beidou Township","ZipCode":"521"},{"Id":143,"ChineseName":"田尾鄉","EnglishName":"Tianwei Township","ZipCode":"522"},{"Id":144,"ChineseName":"埤頭鄉","EnglishName":"Pitou Township","ZipCode":"523"},{"Id":145,"ChineseName":"溪州鄉","EnglishName":"Xizhou Township","ZipCode":"524"},{"Id":146,"ChineseName":"竹塘鄉","EnglishName":"Zhutang Township","ZipCode":"525"},{"Id":147,"ChineseName":"二林鎮","EnglishName":"Erlin Township","ZipCode":"526"},{"Id":148,"ChineseName":"大城鄉","EnglishName":"Dacheng Township","ZipCode":"527"},{"Id":149,"ChineseName":"芳苑鄉","EnglishName":"Fangyuan Township","ZipCode":"528"},{"Id":150,"ChineseName":"二水鄉","EnglishName":"Ershui Township","ZipCode":"530"}]},{"Id":10,"ChineseName":"南投縣","EnglishName":"Nantou County","District":[{"Id":151,"ChineseName":"南投市","EnglishName":"Nantou City","ZipCode":"540"},{"Id":152,"ChineseName":"中寮鄉","EnglishName":"Zhongliao Township","ZipCode":"541"},{"Id":153,"ChineseName":"草屯鎮","EnglishName":"Caotun Township","ZipCode":"542"},{"Id":154,"ChineseName":"國姓鄉","EnglishName":"Guoxing Township","ZipCode":"544"},{"Id":155,"ChineseName":"埔里鎮","EnglishName":"Puli Township","ZipCode":"545"},{"Id":156,"ChineseName":"仁愛鄉","EnglishName":"Ren' ai Township","ZipCode":"546"},{"Id":157,"ChineseName":"名間鄉","EnglishName":"Mingjian Township","ZipCode":"551"},{"Id":158,"ChineseName":"集集鎮","EnglishName":"Jiji Township","ZipCode":"552"},{"Id":159,"ChineseName":"水里鄉","EnglishName":"Shuili Township","ZipCode":"553"},{"Id":160,"ChineseName":"魚池鄉","EnglishName":"Yuchi Township","ZipCode":"555"},{"Id":161,"ChineseName":"信義鄉","EnglishName":"Xinyi Township","ZipCode":"556"},{"Id":162,"ChineseName":"竹山鎮","EnglishName":"Zhushan Township","ZipCode":"557"},{"Id":163,"ChineseName":"鹿谷鄉","EnglishName":"Lugu Township","ZipCode":"558"}]},{"Id":11,"ChineseName":"雲林縣","EnglishName":"Yunlin County","District":[{"Id":164,"ChineseName":"斗南鎮","EnglishName":"Dounan Township","ZipCode":"630"},{"Id":165,"ChineseName":"大埤鄉","EnglishName":"Dapi Township","ZipCode":"631"},{"Id":166,"ChineseName":"虎尾鎮","EnglishName":"Huwei Township","ZipCode":"632"},{"Id":167,"ChineseName":"土庫鎮","EnglishName":"Tuku Township","ZipCode":"633"},{"Id":168,"ChineseName":"褒忠鄉","EnglishName":"Baozhong Township","ZipCode":"634"},{"Id":169,"ChineseName":"東勢鄉","EnglishName":"Dongshi Township","ZipCode":"635"},{"Id":170,"ChineseName":"台西鄉","EnglishName":"Taixi Township","ZipCode":"636"},{"Id":171,"ChineseName":"崙背鄉","EnglishName":"Lunbei Township","ZipCode":"637"},{"Id":172,"ChineseName":"麥寮鄉","EnglishName":"Mailiao Township","ZipCode":"638"},{"Id":173,"ChineseName":"斗六市","EnglishName":"Douliu City","ZipCode":"640"},{"Id":174,"ChineseName":"林內鄉","EnglishName":"Linnei Township","ZipCode":"643"},{"Id":175,"ChineseName":"古坑鄉","EnglishName":"Gukeng Township","ZipCode":"646"},{"Id":176,"ChineseName":"莿桐鄉","EnglishName":"Citong Township","ZipCode":"647"},{"Id":177,"ChineseName":"西螺鎮","EnglishName":"Xiluo Township","ZipCode":"648"},{"Id":178,"ChineseName":"二崙鄉","EnglishName":"Erlun Township","ZipCode":"649"},{"Id":179,"ChineseName":"北港鎮","EnglishName":"Beigang Township","ZipCode":"651"},{"Id":180,"ChineseName":"水林鄉","EnglishName":"Shuilin Township","ZipCode":"652"},{"Id":181,"ChineseName":"口湖鄉","EnglishName":"Kouhu Township","ZipCode":"653"},{"Id":182,"ChineseName":"四湖鄉","EnglishName":"Sihu Township","ZipCode":"654"},{"Id":183,"ChineseName":"元長鄉","EnglishName":"Yuanchang Township","ZipCode":"655"}]},{"Id":12,"ChineseName":"嘉義市","EnglishName":"Chiayi City","District":[{"Id":184,"ChineseName":"東區","EnglishName":"East Dist.","ZipCode":"600"},{"Id":185,"ChineseName":"西區","EnglishName":"West Dist.","ZipCode":"600"}]},{"Id":13,"ChineseName":"嘉義縣","EnglishName":"Chiayi County","District":[{"Id":186,"ChineseName":"番路鄉","EnglishName":"Fanlu Township","ZipCode":"602"},{"Id":187,"ChineseName":"梅山鄉","EnglishName":"Meishan Township","ZipCode":"603"},{"Id":188,"ChineseName":"竹崎鄉","EnglishName":"Zhuqi Township","ZipCode":"604"},{"Id":189,"ChineseName":"阿里山","EnglishName":"Alishan Township","ZipCode":"605"},{"Id":190,"ChineseName":"中埔鄉","EnglishName":"Zhongpu Township","ZipCode":"606"},{"Id":191,"ChineseName":"大埔鄉","EnglishName":"Dapu Township","ZipCode":"607"},{"Id":192,"ChineseName":"水上鄉","EnglishName":"Shuishang Township","ZipCode":"608"},{"Id":193,"ChineseName":"鹿草鄉","EnglishName":"Lucao Township","ZipCode":"611"},{"Id":194,"ChineseName":"太保市","EnglishName":"Taibao City","ZipCode":"612"},{"Id":195,"ChineseName":"朴子市","EnglishName":"Puzi City","ZipCode":"613"},{"Id":196,"ChineseName":"東石鄉","EnglishName":"Dongshi Township","ZipCode":"614"},{"Id":197,"ChineseName":"六腳鄉","EnglishName":"Liujiao Township","ZipCode":"615"},{"Id":198,"ChineseName":"新港鄉","EnglishName":"Xingang Township","ZipCode":"616"},{"Id":199,"ChineseName":"民雄鄉","EnglishName":"Minxiong Township","ZipCode":"621"},{"Id":200,"ChineseName":"大林鎮","EnglishName":"Dalin Township","ZipCode":"622"},{"Id":201,"ChineseName":"溪口鄉","EnglishName":"Xikou Township","ZipCode":"623"},{"Id":202,"ChineseName":"義竹鄉","EnglishName":"Yizhu Township","ZipCode":"624"},{"Id":203,"ChineseName":"布袋鎮","EnglishName":"Budai Township","ZipCode":"625"}]},{"Id":14,"ChineseName":"臺南市","EnglishName":" Tainan City","District":[{"Id":204,"ChineseName":"中西區","EnglishName":"West Central Dist.","ZipCode":"700"},{"Id":205,"ChineseName":"東　區","EnglishName":"East Dist.","ZipCode":"701"},{"Id":206,"ChineseName":"南　區","EnglishName":"South Dist.","ZipCode":"702"},{"Id":207,"ChineseName":"北　區","EnglishName":"North Dist.","ZipCode":"704"},{"Id":208,"ChineseName":"安平區","EnglishName":"Anping Dist.","ZipCode":"708"},{"Id":209,"ChineseName":"安南區","EnglishName":"Annan Dist.","ZipCode":"709"},{"Id":210,"ChineseName":"永康區","EnglishName":"Yongkang Dist.","ZipCode":"710"},{"Id":211,"ChineseName":"歸仁區","EnglishName":"Guiren Dist.","ZipCode":"711"},{"Id":212,"ChineseName":"新化區","EnglishName":"Xinhua Dist.","ZipCode":"712"},{"Id":213,"ChineseName":"左鎮區","EnglishName":"Zuozhen Dist.","ZipCode":"713"},{"Id":214,"ChineseName":"玉井區","EnglishName":"Yujing Dist.","ZipCode":"714"},{"Id":215,"ChineseName":"楠西區","EnglishName":"Nanxi Dist.","ZipCode":"715"},{"Id":216,"ChineseName":"南化區","EnglishName":"Nanhua Dist.","ZipCode":"716"},{"Id":217,"ChineseName":"仁德區","EnglishName":"Rende Dist.","ZipCode":"717"},{"Id":218,"ChineseName":"關廟區","EnglishName":"Guanmiao Dist.","ZipCode":"718"},{"Id":219,"ChineseName":"龍崎區","EnglishName":"Longqi Dist.","ZipCode":"719"},{"Id":220,"ChineseName":"官田區","EnglishName":"Guantian Dist.","ZipCode":"720"},{"Id":221,"ChineseName":"麻豆區","EnglishName":"Madou Dist.","ZipCode":"721"},{"Id":222,"ChineseName":"佳里區","EnglishName":"Jiali Dist.","ZipCode":"722"},{"Id":223,"ChineseName":"西港區","EnglishName":"Xigang Dist.","ZipCode":"723"},{"Id":224,"ChineseName":"七股區","EnglishName":"Qigu Dist.","ZipCode":"724"},{"Id":225,"ChineseName":"將軍區","EnglishName":"Jiangjun Dist.","ZipCode":"725"},{"Id":226,"ChineseName":"學甲區","EnglishName":"Xuejia Dist.","ZipCode":"726"},{"Id":227,"ChineseName":"北門區","EnglishName":"Beimen Dist.","ZipCode":"727"},{"Id":228,"ChineseName":"新營區","EnglishName":"Xinying Dist.","ZipCode":"730"},{"Id":229,"ChineseName":"後壁區","EnglishName":"Houbi Dist.","ZipCode":"731"},{"Id":230,"ChineseName":"白河區","EnglishName":"Baihe Dist.","ZipCode":"732"},{"Id":231,"ChineseName":"東山區","EnglishName":"Dongshan Dist.","ZipCode":"733"},{"Id":232,"ChineseName":"六甲區","EnglishName":"Liujia Dist.","ZipCode":"734"},{"Id":233,"ChineseName":"下營區","EnglishName":"Xiaying Dist.","ZipCode":"735"},{"Id":234,"ChineseName":"柳營區","EnglishName":"Liuying Dist.","ZipCode":"736"},{"Id":235,"ChineseName":"鹽水區","EnglishName":"Yanshui Dist.","ZipCode":"737"},{"Id":236,"ChineseName":"善化區","EnglishName":"Shanhua Dist.","ZipCode":"741"},{"Id":237,"ChineseName":"大內區","EnglishName":"Danei Dist.","ZipCode":"742"},{"Id":238,"ChineseName":"山上區","EnglishName":"Shanshang Dist.","ZipCode":"743"},{"Id":239,"ChineseName":"新市區","EnglishName":"Xinshi Dist.","ZipCode":"744"},{"Id":240,"ChineseName":"安定區","EnglishName":"Anding Dist.","ZipCode":"745"}]},{"Id":15,"ChineseName":"高雄市","EnglishName":"Kaohsiung City","District":[{"Id":241,"ChineseName":"新興區","EnglishName":"Xinxing Dist.","ZipCode":"800"},{"Id":242,"ChineseName":"前金區","EnglishName":"Qianjin Dist.","ZipCode":"801"},{"Id":243,"ChineseName":"苓雅區","EnglishName":"Lingya Dist.","ZipCode":"802"},{"Id":244,"ChineseName":"鹽埕區","EnglishName":"Yancheng Dist.","ZipCode":"803"},{"Id":245,"ChineseName":"鼓山區","EnglishName":"Gushan Dist.","ZipCode":"804"},{"Id":246,"ChineseName":"旗津區","EnglishName":"Qijin Dist.","ZipCode":"805"},{"Id":247,"ChineseName":"前鎮區","EnglishName":"Qianzhen Dist.","ZipCode":"806"},{"Id":248,"ChineseName":"三民區","EnglishName":"Sanmin Dist.","ZipCode":"807"},{"Id":249,"ChineseName":"楠梓區","EnglishName":"Nanzi Dist.","ZipCode":"811"},{"Id":250,"ChineseName":"小港區","EnglishName":"Xiaogang Dist.","ZipCode":"812"},{"Id":251,"ChineseName":"左營區","EnglishName":"Zuoying Dist.","ZipCode":"813"},{"Id":252,"ChineseName":"仁武區","EnglishName":"Renwu Dist.","ZipCode":"814"},{"Id":253,"ChineseName":"大社區","EnglishName":"Dashe Dist.","ZipCode":"815"},{"Id":254,"ChineseName":"岡山區","EnglishName":"Gangshan Dist.","ZipCode":"820"},{"Id":255,"ChineseName":"路竹區","EnglishName":"Luzhu Dist.","ZipCode":"821"},{"Id":256,"ChineseName":"阿蓮區","EnglishName":"Alian Dist.","ZipCode":"822"},{"Id":257,"ChineseName":"田寮區","EnglishName":"Tianliao Dist.","ZipCode":"823"},{"Id":258,"ChineseName":"燕巢區","EnglishName":"Yanchao Dist.","ZipCode":"824"},{"Id":259,"ChineseName":"橋頭區","EnglishName":"Qiaotou Dist.","ZipCode":"825"},{"Id":260,"ChineseName":"梓官區","EnglishName":"Ziguan Dist.","ZipCode":"826"},{"Id":261,"ChineseName":"彌陀區","EnglishName":"Mituo Dist.","ZipCode":"827"},{"Id":262,"ChineseName":"永安區","EnglishName":"Yong’an Dist.","ZipCode":"828"},{"Id":263,"ChineseName":"湖內區","EnglishName":"Hunei Dist.","ZipCode":"829"},{"Id":264,"ChineseName":"鳳山區","EnglishName":"Fengshan Dist.","ZipCode":"830"},{"Id":265,"ChineseName":"大寮區","EnglishName":"Daliao Dist.","ZipCode":"831"},{"Id":266,"ChineseName":"林園區","EnglishName":"Linyuan Dist.","ZipCode":"832"},{"Id":267,"ChineseName":"鳥松區","EnglishName":"Niaosong Dist.","ZipCode":"833"},{"Id":268,"ChineseName":"大樹區","EnglishName":"Dashu Dist.","ZipCode":"840"},{"Id":269,"ChineseName":"旗山區","EnglishName":"Qishan Dist.","ZipCode":"842"},{"Id":270,"ChineseName":"美濃區","EnglishName":"Meinong Dist.","ZipCode":"843"},{"Id":271,"ChineseName":"六龜區","EnglishName":"Liugui Dist.","ZipCode":"844"},{"Id":272,"ChineseName":"內門區","EnglishName":"Neimen Dist.","ZipCode":"845"},{"Id":273,"ChineseName":"杉林區","EnglishName":"Shanlin Dist.","ZipCode":"846"},{"Id":274,"ChineseName":"甲仙區","EnglishName":"Jiaxian Dist.","ZipCode":"847"},{"Id":275,"ChineseName":"桃源區","EnglishName":"Taoyuan Dist.","ZipCode":"848"},{"Id":276,"ChineseName":"那瑪夏","EnglishName":"Namaxia Dist.","ZipCode":"849"},{"Id":277,"ChineseName":"茂林區","EnglishName":"Maolin Dist.","ZipCode":"851"},{"Id":278,"ChineseName":"茄萣區","EnglishName":"Qieding Dist.","ZipCode":"852"}]},{"Id":16,"ChineseName":"屏東縣","EnglishName":"Pingtung County","District":[{"Id":279,"ChineseName":"屏東市","EnglishName":"Pingtung City","ZipCode":"900"},{"Id":280,"ChineseName":"三地門","EnglishName":"Sandimen Township","ZipCode":"901"},{"Id":281,"ChineseName":"霧台鄉","EnglishName":"Wutai Township","ZipCode":"902"},{"Id":282,"ChineseName":"瑪家鄉","EnglishName":"Majia Township","ZipCode":"903"},{"Id":283,"ChineseName":"九如鄉","EnglishName":"Jiuru Township","ZipCode":"904"},{"Id":284,"ChineseName":"里港鄉","EnglishName":"Ligang Township","ZipCode":"905"},{"Id":285,"ChineseName":"高樹鄉","EnglishName":"Gaoshu Township","ZipCode":"906"},{"Id":286,"ChineseName":"鹽埔鄉","EnglishName":"Yanpu Township","ZipCode":"907"},{"Id":287,"ChineseName":"長治鄉","EnglishName":"Changzhi Township","ZipCode":"908"},{"Id":288,"ChineseName":"麟洛鄉","EnglishName":"Linluo Township","ZipCode":"909"},{"Id":289,"ChineseName":"竹田鄉","EnglishName":"Zhutian Township","ZipCode":"911"},{"Id":290,"ChineseName":"內埔鄉","EnglishName":"Neipu Township","ZipCode":"912"},{"Id":291,"ChineseName":"萬丹鄉","EnglishName":"Wandan Township","ZipCode":"913"},{"Id":292,"ChineseName":"潮州鎮","EnglishName":"Chaozhou Township","ZipCode":"920"},{"Id":293,"ChineseName":"泰武鄉","EnglishName":"Taiwu Township","ZipCode":"921"},{"Id":294,"ChineseName":"來義鄉","EnglishName":"Laiyi Township","ZipCode":"922"},{"Id":295,"ChineseName":"萬巒鄉","EnglishName":"Wanluan Township","ZipCode":"923"},{"Id":296,"ChineseName":"崁頂鄉","EnglishName":"Kanding Township","ZipCode":"924"},{"Id":297,"ChineseName":"新埤鄉","EnglishName":"Xinpi Township","ZipCode":"925"},{"Id":298,"ChineseName":"南州鄉","EnglishName":"Nanzhou Township","ZipCode":"926"},{"Id":299,"ChineseName":"林邊鄉","EnglishName":"Linbian Township","ZipCode":"927"},{"Id":300,"ChineseName":"東港鎮","EnglishName":"Donggang Township","ZipCode":"928"},{"Id":301,"ChineseName":"琉球鄉","EnglishName":"Liuqiu Township","ZipCode":"929"},{"Id":302,"ChineseName":"佳冬鄉","EnglishName":"Jiadong Township","ZipCode":"931"},{"Id":303,"ChineseName":"新園鄉","EnglishName":"Xinyuan Township","ZipCode":"932"},{"Id":304,"ChineseName":"枋寮鄉","EnglishName":"Fangliao Township","ZipCode":"940"},{"Id":305,"ChineseName":"枋山鄉","EnglishName":"Fangshan Township","ZipCode":"941"},{"Id":306,"ChineseName":"春日鄉","EnglishName":"Chunri Township","ZipCode":"942"},{"Id":307,"ChineseName":"獅子鄉","EnglishName":"Shizi Township","ZipCode":"943"},{"Id":308,"ChineseName":"車城鄉","EnglishName":"Checheng Township","ZipCode":"944"},{"Id":309,"ChineseName":"牡丹鄉","EnglishName":"Mudan Township","ZipCode":"945"},{"Id":310,"ChineseName":"恆春鎮","EnglishName":"Hengchun Township","ZipCode":"946"},{"Id":311,"ChineseName":"滿州鄉","EnglishName":"Manzhou Township","ZipCode":"947"}]},{"Id":17,"ChineseName":"臺東縣","EnglishName":"Taitung County","District":[{"Id":312,"ChineseName":"台東市","EnglishName":"Taitung City","ZipCode":"950"},{"Id":313,"ChineseName":"綠島鄉","EnglishName":"Ludao Township","ZipCode":"951"},{"Id":314,"ChineseName":"蘭嶼鄉","EnglishName":"Lanyu Township","ZipCode":"952"},{"Id":315,"ChineseName":"延平鄉","EnglishName":"Yanping Township","ZipCode":"953"},{"Id":316,"ChineseName":"卑南鄉","EnglishName":"Beinan Township","ZipCode":"954"},{"Id":317,"ChineseName":"鹿野鄉","EnglishName":"Luye Township","ZipCode":"955"},{"Id":318,"ChineseName":"關山鎮","EnglishName":"Guanshan Township","ZipCode":"956"},{"Id":319,"ChineseName":"海端鄉","EnglishName":"Haiduan Township","ZipCode":"957"},{"Id":320,"ChineseName":"池上鄉","EnglishName":"Chishang Township","ZipCode":"958"},{"Id":321,"ChineseName":"東河鄉","EnglishName":"Donghe Township","ZipCode":"959"},{"Id":322,"ChineseName":"成功鎮","EnglishName":"Chenggong Township","ZipCode":"961"},{"Id":323,"ChineseName":"長濱鄉","EnglishName":"Changbin Township","ZipCode":"962"},{"Id":324,"ChineseName":"太麻里","EnglishName":"Taimali Township","ZipCode":"963"},{"Id":325,"ChineseName":"金峰鄉","EnglishName":"Jinfeng Township","ZipCode":"964"},{"Id":326,"ChineseName":"大武鄉","EnglishName":"Dawu Township","ZipCode":"965"},{"Id":327,"ChineseName":"達仁鄉","EnglishName":"Daren Township","ZipCode":"966"}]},{"Id":18,"ChineseName":"花蓮縣","EnglishName":"Hualien County","District":[{"Id":328,"ChineseName":"花蓮市","EnglishName":"Hualien City","ZipCode":"970"},{"Id":329,"ChineseName":"新城鄉","EnglishName":"Xincheng Township","ZipCode":"971"},{"Id":330,"ChineseName":"秀林鄉","EnglishName":"Xiulin Township","ZipCode":"972"},{"Id":331,"ChineseName":"吉安鄉","EnglishName":"Ji’an Township","ZipCode":"973"},{"Id":332,"ChineseName":"壽豐鄉","EnglishName":"Shoufeng Township","ZipCode":"974"},{"Id":333,"ChineseName":"鳳林鎮","EnglishName":"Fenglin Township","ZipCode":"975"},{"Id":334,"ChineseName":"光復鄉","EnglishName":"Guangfu Township","ZipCode":"976"},{"Id":335,"ChineseName":"豐濱鄉","EnglishName":"Fengbin Township","ZipCode":"977"},{"Id":336,"ChineseName":"瑞穗鄉","EnglishName":"Ruisui Township","ZipCode":"978"},{"Id":337,"ChineseName":"萬榮鄉","EnglishName":"Wanrong Township","ZipCode":"979"},{"Id":338,"ChineseName":"玉里鎮","EnglishName":"Yuli Township","ZipCode":"981"},{"Id":339,"ChineseName":"卓溪鄉","EnglishName":"Zhuoxi Township","ZipCode":"982"},{"Id":340,"ChineseName":"富里鄉","EnglishName":"Fuli Township","ZipCode":"983"}]},{"Id":19,"ChineseName":"宜蘭縣","EnglishName":"Yilan County","District":[{"Id":341,"ChineseName":"宜蘭市","EnglishName":"Yilan City","ZipCode":"260"},{"Id":342,"ChineseName":"頭城鎮","EnglishName":"Toucheng Township","ZipCode":"261"},{"Id":343,"ChineseName":"礁溪鄉","EnglishName":"Jiaoxi Township","ZipCode":"262"},{"Id":344,"ChineseName":"壯圍鄉","EnglishName":"Zhuangwei Township","ZipCode":"263"},{"Id":345,"ChineseName":"員山鄉","EnglishName":"Yuanshan Township","ZipCode":"264"},{"Id":346,"ChineseName":"羅東鎮","EnglishName":"Luodong Township","ZipCode":"265"},{"Id":347,"ChineseName":"三星鄉","EnglishName":"Sanxing Township","ZipCode":"266"},{"Id":348,"ChineseName":"大同鄉","EnglishName":"Datong Township","ZipCode":"267"},{"Id":349,"ChineseName":"五結鄉","EnglishName":"Wujie Township","ZipCode":"268"},{"Id":350,"ChineseName":"冬山鄉","EnglishName":"Dongshan Township","ZipCode":"269"},{"Id":351,"ChineseName":"蘇澳鎮","EnglishName":"Su' ao Township","ZipCode":"270"},{"Id":352,"ChineseName":"南澳鄉","EnglishName":"Nan' ao Township","ZipCode":"272"}]},{"Id":20,"ChineseName":"澎湖縣","EnglishName":"Penghu County","District":[{"Id":353,"ChineseName":"馬公市","EnglishName":"Magong City","ZipCode":"880"},{"Id":354,"ChineseName":"西嶼鄉","EnglishName":"Xiyu Township","ZipCode":"881"},{"Id":355,"ChineseName":"望安鄉","EnglishName":"Wang’an Township","ZipCode":"882"},{"Id":356,"ChineseName":"七美鄉","EnglishName":"Qimei Township","ZipCode":"883"},{"Id":357,"ChineseName":"白沙鄉","EnglishName":"Baisha Township","ZipCode":"884"},{"Id":358,"ChineseName":"湖西鄉","EnglishName":"Huxi Township","ZipCode":"885"}]},{"Id":21,"ChineseName":"金門縣","EnglishName":"Kinmen County","District":[{"Id":359,"ChineseName":"金沙鎮","EnglishName":"Jinsha Township","ZipCode":"890"},{"Id":360,"ChineseName":"金湖鎮","EnglishName":"Jinhu Township","ZipCode":"891"},{"Id":361,"ChineseName":"金寧鄉","EnglishName":"Jinning Township","ZipCode":"892"},{"Id":362,"ChineseName":"金城鎮","EnglishName":"Jincheng Township","ZipCode":"893"},{"Id":363,"ChineseName":"烈嶼鄉","EnglishName":"Lieyu Township","ZipCode":"894"},{"Id":364,"ChineseName":"烏坵鄉","EnglishName":"Wuqiu Township","ZipCode":"896"}]},{"Id":22,"ChineseName":"連江縣","EnglishName":"Lienchiang County","District":[{"Id":365,"ChineseName":"南竿鄉","EnglishName":"Nangan Township","ZipCode":"209"},{"Id":366,"ChineseName":"北竿鄉","EnglishName":"Beigan Township","ZipCode":"210"},{"Id":367,"ChineseName":"莒光鄉","EnglishName":"Juguang Township","ZipCode":"211"},{"Id":368,"ChineseName":"東引鄉","EnglishName":"Dongyin Township","ZipCode":"212"}]}]};
}

function getVmData()
{
    $.getJSON(vm_api_url, function (data) {
        vm_array = data;
        setVmMarker();
    });
}




function setVmMarker()
{
    var icon = "";
    var choose = "";

    contentString = "";
    infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    console.log(vm_array);
    var count_station_01 = 0;
    var count_station_02 = 0;

    $.each(vm_array.data, function (i, item) {
        var icon = (item.State == 1) ? icon1 : icon2;
        var name_json = jQuery.parseJSON(item.LocName);
        var name = name_json.List[1].Value;
        var address_json = jQuery.parseJSON(item.Address);
        var address = address_json.List[1].Value;
        var availableTime = item.AvailableTime;
        var show_info = name + "<br />" + address + "<br />" + "營業時間 " + availableTime;
        var myLatlng = new google.maps.LatLng(item.Latitude, item.Longitude);
        var marker = new google.maps.Marker(
        {
            icon: icon,
            position: myLatlng,
            //title: item.Address,
            id: item.Id,
            state:item.State,
            name: show_info,
        });


        //count the station amount
        if (item.State == 1) {
            count_station_01++;
        } else {
            count_station_02++;
        }

        marker.setMap(gmap);

        google.maps.event.addListener(marker, 'click', function () {

            infowindow.setContent(this.name);
            infowindow.open(gmap, this);
        });

        google.maps.event.addListener(marker, 'mouseover', function () {
            this.setIcon(icon1_click);
        });

        google.maps.event.addListener(marker, 'mouseout', function () {
            if (this.state == 1) {
                this.setIcon(icon1);
            } else {
                this.setIcon(icon2);
            }
           // infowindow.close();
        });
    });


    //count the station amount
    $('#count_station_01').html(count_station_01);
    $('#count_station_02').html(count_station_02);
    $('#total_station').html(count_station_01 + count_station_02);
}

function searchbox() {
    var input = (document.getElementById('pac-input'));
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox((input));

    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();
        console.log(places);
        gmap.setCenter(places[0].geometry.location);
    });
}



function getConstrution() {
    $.getJSON(construction_api_url, function (data) {
        construction_array = data;
        setConstruction();
    });
}


function setConstruction() {



    console.log(construction_array);


    $.each(construction_array.data, function (i, item) {
        //var icon = (item.State == 1) ? icon1 : icon2;
        //var name_json = jQuery.parseJSON(item.Name);
        //var name = name_json.List[1].Value;
        //var address_json = jQuery.parseJSON(item.Address);
        //var address = address_json.List[1].Value;
        //var availableTime = item.AvailableTime;
        //var show_info = name + "<br />" + address + "<br />" + "營業時間 " + availableTime;

        var name = item.Name;
        var Status = item.Status;
        var Address = item.Address;
        var ConstructionStart = item.ConstructionStart;
        var ConstructionEnd = item.ConstructionEnd;



        var construction_name = "<div class='col-xs-6 under_name'>" + name + " </div>";
        var construction_status = " <div class='col-xs-6 under_state'>" + Status + " </div>";
        var construction_address = " <div class='col-xs-12 under_addresss'>" + Address + " </div>";
        var construction_period = " <div class='col-xs-12 under_time'>" + ConstructionStart + "~" + ConstructionEnd + " </div>";
        console.log("Jill");



        //count the station amount
        $('#construction_name').html(construction_name);
        $('#construction_address').html(construction_status);
        $('#construction_period').html(construction_address);
        $('#construction_status').html(construction_period);

    });


    //count the station amount



}
