<template>
  <div>
    <div class="my-8 ma-auto w-75" style="line-height: 2em">
      <h2 style="text-align: center">Proje Hakkında</h2>
      <v-divider class="my-5 mb-8 w-100"></v-divider>
      <h3 class="about-title">- Depom Nedir?</h3>
      <p>
        Depom bir stok takip programıdır. Bu program, şirketlerin sahip
        oldukları ve satışını yaptıkları ürünlerin stok miktarlarını , kar /
        zarar durumlarını ve gerçekleşen işlem miktarlarını takip etmelerine
        yardımcı olur. Depom sayesinde, stoklarda azalan ürünler hakkında bilgi
        sahibi olabilir, hangi ay kar edip zarar ettiğini görebilir, bugün
        yapılan işlem sayısının takibini yapabilir, şirketinizin toplamda elde
        ettiği kar / zarar fiyatını ve oranını görerek önlemler alabilir veya
        satış fiyatını arttırıp azaltabilirsiniz. Depom, hangi ürünün ne zaman,
        ne kadar, hangi birim fiyattan geldiğini ve hangi birim fiyattan çıkış
        yapıldığını görmenize olanak sağlar. Ön izleme sayfasındaki tablolar ve
        grafikler sayesinde stok yönetiminizin daha verimli olmasını sağlar.
      </p>

      <v-expansion-panels v-model="panel" class="my-15" multiple>
        <v-expansion-panel
          text="Toplam Kar / Zarar: Stoğunuzdaki ürünlerin toplam kar /
        zarar fiyatını görürsünüz. Hemen altında ise net kar marjınızı ve bu
        marjın artış mı yoksa azalış mı olduğunu görebilirsiniz.
        Toplam Stok Miktarı: Stoğunuzdaki toplam ürün miktarını
        görürsünüz.
        Bugünkü İşlem Sayısı: Bugün içerisinde stoğa eklenen
        veya çıkarılan ürünlerin işlem sayısını görürsünüz.
        Yapılan İşlem Ürün Miktarı: Bugüne kadar ki yapılan tüm
        işlemlerin giriş işlemi mi yoksa çıkış işlemimi olduğunu pasta grafiği
        olarak görmenizi sağlar ve bu işlemlerin yüzdelik olarak oranını
        gösterir.
        Aylara Göre Kar / Zarar %: Bulunulan yıl için aylara
        göre yapılan işlemler bazında kar / zarar oranını yüzdelik olarak çizgi
        grafiği şeklinde gösterir."
          title="Ön İzleme"
          value="dashboard"
        />

        <v-expansion-panel
          text="Stoğa girilen ve çıkış yapılan ürünlerin hangi tarihte işlemlerinin
        yapıldığını ve giriş işlemi mi yoksa çıkış işlemi mi bunu kayıt edildiği
        andaki bilgilerinin tablo halinde görüntülendiği sayfadır. Bu sayfada
        ayrıca ürünlerin barkod numaraları, ürün adları, kategorileri, alt
        kategorileri, tedarikçileri, markaları, birimleri, miktarları ve birim
        fiyatları gibi bilgileri de görüntüleyebilir ayrıca her bir alan için
        sıralama işlemi yapabilirisniz."
          title="Depo - Stok"
          value="stock"
        />

        <v-expansion-panel
          text="Stoğa girilecek olan ürünleri kayıt edilen sayfadır. Bu sayfadaki 'Stok Kodu / Barkod' alanına ürünün barkod bilgisini girerek eğer daha önce stokta bu ürün var ise bu barkoda ait ürün bilgilerini 'Ürün Bul' butonuna tıklayarak getirebilirsiniz. Eğer yeni bir barkod ise bu ürünün bilgilerini girerek kayıt edebilirsiniz. Tüm alanların doldurulması zorunludur."
          title="Stok Giriş"
          value="entry"
        />

        <v-expansion-panel
          text="Stoktan çıkış yapılacak olan ürünlerin kayıt edildiği sayfadır. Bu sayfadaki 'Stok Kodu / Barkod' alanına ürünün barkod bilgisini girerek çıkış yapılacak ürünün bilgisini elde ediyoruz ve böylece stokta bu üründen ne kadar olduğunun ve birim fiyatının ne kadar olduğunun bilgisini görebiliyoruz. Bu bilgiler eşliğinde ürünümüzden ne kadarının stoktan çıkması gerektiği bilgisini ve ne kadara çıkış yapıldığı bilgisini girerek çıkış işlemini gerçekleştirebiliyoruz. Tüm alanların doldurulması zorunludur."
          title="Stok Çıkış"
          value="checkout"
        />

        <v-expansion-panel
          text="Bu sayfada ki tablonuzda tüm stoktaki ürünler için hesaplamalar yapılır. Burada aynı barkod bilgisine ait ürünler toplanır ve bu ürünlerin toplam stok miktarı ve toplam birim fiyatı hesaplanır. Bu sayede stoktaki ürünlerin toplam miktarını ve fiyatını görebilirsiniz. Kar / Zarar hesaplamaları yapılır. Son işlem tarihleri ile beraber tablonuzda yer alır. Tablonuzu istediğiniz kısıma göre sıralayabilirsiniz."
          title="Cari Hesaplar"
          value="current"
        />

        <v-expansion-panel
          text="Hesap bilgilerinizi güncelleyebileceğiniz sayfadır. Bu sayfada hesap bilgilerinizi görebilir ve güncelleyebilirsiniz. 'Şifremi Düzenle' kısmında eski şifrenizi doğru yazdığınız takdirde şifrenizide güncelleyebilirsiniz."
          title="Hesabımı Düzenle"
          value="update-account"
        />
      </v-expansion-panels>

      <h3 class="about-title">- Geliştirici</h3>
      <div class="author-info">
        <p><strong>Adı: </strong>Nurcan Cürebal</p>
        <p><strong>Rolü: </strong>Full Stack Developer</p>
        <p>
          <strong>Linkedin: </strong>
          <a href="https://www.linkedin.com/in/nurcancurebal/" target="_blank">
            linkedin.com/nurcancurebal
          </a>
        </p>
        <p>
          <strong>Github: </strong>
          <a href="https://github.com/nurcancurebal" target="_blank">
            github.com/nurcancurebal
          </a>
        </p>
        <p>
          <strong>Frontend Github Repository: </strong>
          <a
            href="https://github.com/nurcancurebal/depom-frontend"
            target="_blank"
          >
            nurcancurebal/depom-frontend
          </a>
        </p>
        <p>
          <strong>Backend Github Repository: </strong>
          <a
            href="https://github.com/nurcancurebal/depom-backend"
            target="_blank"
          >
            nurcancurebal/depom-backend
          </a>
        </p>
        <p>
          <strong>Biyografi:</strong> Merhaba, 2021 yılında yazılıma ilgi
          duymaya başladım ve o tarihten bu yana kendimi birçok alanda
          geliştirdim. İş yönetimi, takım çalışması, proje versiyonlama, Vue ve
          genel frontend kütüphaneleri, Express ve genel backend kütüphaneleri
          ile NoSQL ve SQL veritabanları konularında deneyim sahibiyim. Şu ana
          kadar kendi projelerimi geliştirdim ve full stack developer olarak
          çalışmaktayım. Bu alanlarda kendimi daha da geliştirmek ve yeni
          projelere imza atmak istiyorum
        </p>
      </div>
    </div>
    <MakeSuggestions />
  </div>
</template>

<script>
import MakeSuggestions from "@/components/ProjectOverview/MakeSuggestions.vue";

export default {
  components: {
    MakeSuggestions,
  },

  data() {
    return {
      panel: [],
    };
  },
};
</script>
<style>
.v-expansion-panel-title {
  color: #2b96cc !important;
}
a {
  color: #2b96cc;
  text-decoration: none;
}
.about-title {
  color: #2b96cc;
  text-indent: 40px;
}
</style>