function Footer() {
    return (
        <>
            <footer className="footer">
            <div className="footer-left">
      <ul className="footer-01">
        <li>
          <img src="/content/images/logo.svg" alt="Mogi.vn" height="32" width="96" />
        </li>
        <li>
          <i className="fa fa-phone"></i>(028) 73001234
        </li>
        <li>
          <i className="fa fa-envelope"></i>
          <a href="mailto:trogiup@mogi.vn">trogiup@mogi.vn</a>
        </li>
        <li className="social-icon">
          <a
            aria-label="mogi facebook"
            href="https://www.facebook.com/mogivietnam"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            aria-label="mogi youtube"
            href="https://www.youtube.com/channel/UCzLLWVLmKqzmIDIOmYFHiZg"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <i className="fa fa-youtube"></i>
          </a>
          <a
            aria-label="mogi zalo"
            href="https://zalo.me/4599343447665056788"
            className="zalo-icon"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <svg className="mi mi-zalo">
              <use xlinkHref="/content/fonts/mogi-icons.svg#mi-zalo"></use>
            </svg>
          </a>
        </li>
      </ul>
      <ul className="footer-02">
        <li>
          <h3 className="footer-title">CÔNG TY CỔ PHẦN ĐỊNH ANH</h3>
        </li>
        <li>
          Trụ sở chính: 28-30 đường số 2, Hưng Gia 5, P.Tân Phong, Quận 7, TP. Hồ Chí Minh
          <br />
          Chịu trách nhiệm chính: Ông Phạm Chu Hi
          <br />
          Giấy phép số: 429/GP-BTTTT do Bộ TTTT cấp ngày 11/10/2019
        </li>
        <li>
          <a
            href="http://online.gov.vn/homepage/websitedisplay.aspx?docid=31190"
            target="_blank"
            rel="nofollow noreferrer"
            aria-label="bocongthuong"
          >
            <img
              className="lozad bocongthuong"
              data-src="/content/images/bocongthuong.png"
              width="150"
              height="47"
              alt="bo cong thuong"
              src="/content/images/bocongthuong.png"
              data-loaded="true"
            />
          </a>
        </li>
        <li>Mogi.vn có trách nhiệm chuyển tải thông tin. Chúng tôi không chịu bất kỳ trách nhiệm nào từ các tin này.</li>
      </ul>
    </div>
            </footer>
        </>
    )
}

export default Footer;