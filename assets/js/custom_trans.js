$(function() {
  var e = function(e) {
    var t = e.parent || console.warn("no parent"),
      a = e.displacementImage || console.warn("displacement image missing"),
      o = e.image1 || console.warn("first image missing"),
      i = e.image2 || console.warn("second image missing"),
      n = e.intensity || 1,
      s = e.speedIn || 1.6,
      r = e.speedOut || 1.2,
      l = void 0 === e.hover || e.hover,
      p = e.easing || Expo.easeOut,
      c = function() {
        var e,
          t = !1;
        return (
          (e = navigator.userAgent || navigator.vendor || window.opera),
          (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            e
          ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              e.substr(0, 4)
            )) &&
            (t = !0),
          t
        );
      };
    c() &&
      ((document.querySelector(".grid__item-img img").style.opacity = 1),
      (document.querySelector(".grid__item-img canvas").style.opacity = 0));
    var m = new THREE.Scene(),
      d = new THREE.OrthographicCamera(
        t.offsetWidth / -2,
        t.offsetWidth / 2,
        t.offsetHeight / 2,
        t.offsetHeight / -2,
        1,
        1e3
      );
    d.position.z = 1;
    var g = new THREE.WebGLRenderer({ antialias: !1 });
    g.setPixelRatio(window.devicePixelRatio),
      g.setClearColor(16777215, 0),
      g.setSize(t.offsetWidth, t.offsetHeight),
      t.appendChild(g.domElement);
    var f = new THREE.TextureLoader();
    f.crossOrigin = "";
    var u = f.load(o),
      v = f.load(i),
      h = f.load(a);
    (h.wrapS = h.wrapT = THREE.RepeatWrapping),
      (u.magFilter = v.magFilter = THREE.LinearFilter),
      (u.minFilter = v.minFilter = THREE.LinearFilter),
      (u.anisotropy = g.getMaxAnisotropy()),
      (v.anisotropy = g.getMaxAnisotropy());
    var w,
      y,
      b = new THREE.ShaderMaterial({
        uniforms: {
          effectFactor: { type: "f", value: n },
          dispFactor: { type: "f", value: 0 },
          texture: { type: "t", value: u },
          texture2: { type: "t", value: v },
          disp: { type: "t", value: h }
        },
        vertexShader:
          "\n            varying vec2 vUv;\n            void main() {\n              vUv = uv;\n              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }\n        ",
        fragmentShader:
          "\n            varying vec2 vUv;\n\n            uniform sampler2D texture;\n            uniform sampler2D texture2;\n            uniform sampler2D disp;\n\n            // uniform float time;\n            // uniform float _rot;\n            uniform float dispFactor;\n            uniform float effectFactor;\n\n            // vec2 rotate(vec2 v, float a) {\n            //  float s = sin(a);\n            //  float c = cos(a);\n            //  mat2 m = mat2(c, -s, s, c);\n            //  return m * v;\n            // }\n\n            void main() {\n\n                vec2 uv = vUv;\n\n                // uv -= 0.5;\n                // vec2 rotUV = rotate(uv, _rot);\n                // uv += 0.5;\n\n                vec4 disp = texture2D(disp, uv);\n\n                vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);\n                vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);\n\n                vec4 _texture = texture2D(texture, distortedPosition);\n                vec4 _texture2 = texture2D(texture2, distortedPosition2);\n\n                vec4 finalTexture = mix(_texture, _texture2, dispFactor);\n\n                gl_FragColor = finalTexture;\n                // gl_FragColor = disp;\n            }\n        ",
        transparent: !0,
        opacity: 1
      }),
      k = new THREE.PlaneBufferGeometry(t.offsetWidth, t.offsetHeight, 1),
      $ = new THREE.Mesh(k, b);
    m.add($),
      l &&
        ((w = "mouseenter"),
        (y = "mouseleave"),
        c() && ((w = "touchstart"), (y = "touchend")),
        t.addEventListener(w, function(e) {
          TweenMax.to(b.uniforms.dispFactor, s, { value: 1, ease: p });
        }),
        t.addEventListener(y, function(e) {
          TweenMax.to(b.uniforms.dispFactor, r, { value: 0, ease: p });
        })),
      window.addEventListener("resize", function(e) {
        g.setSize(t.offsetWidth, t.offsetHeight);
      }),
      (this.next = function() {
        TweenMax.to(b.uniforms.dispFactor, s, { value: 1, ease: p });
      }),
      (this.previous = function() {
        TweenMax.to(b.uniforms.dispFactor, r, { value: 0, ease: p });
      });
    var x = function() {
      requestAnimationFrame(x), g.render(m, d);
    };
    x();
  };
  imagesLoaded(document.querySelectorAll("img"), () => {
    document.body.classList.remove("loading"),
      Array.from(document.querySelectorAll(".grid__item-img")).forEach(t => {
        const a = Array.from(t.querySelectorAll("img"));
        new e({
          parent: t,
          intensity: t.dataset.intensity || void 0,
          speedIn: t.dataset.speedin || void 0,
          speedOut: t.dataset.speedout || void 0,
          easing: t.dataset.easing || void 0,
          hover: t.dataset.hover || void 0,
          image1: a[0].getAttribute("src"),
          image2: a[0].getAttribute("src"),
          displacementImage: t.dataset.displacement
        });
      });
  });
});
var PageTransitions = jQuery(function(e) {
  var t = e(".side-menu main").find("section.sec_content"),
    a = 1,
    o = 0,
    i = 0,
    n = "body",
    s = "section.current_sec",
    r = !1,
    l = !1,
    p = !1,
    c = {
      WebkitAnimation: "webkitAnimationEnd",
      OAnimation: "oAnimationEnd",
      msAnimation: "MSAnimationEnd",
      animation: "animationend"
    }[Modernizr.prefixed("animation")],
    m = Modernizr.cssanimations;
  function d() {
    function i() {
      null == e(n).data("owl_slick")
        ? (e(".owl").slick({
            infinite: !1,
            slidesToShow: 2,
            arrows: !1,
            responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
          }),
          e(n).data("owl_slick", "active"),
          e(".prev-testi").on("click", function() {
            e(".owl").slick("slickPrev");
          }),
          e(".next-testi").on("click", function() {
            e(".owl").slick("slickNext");
          }))
        : e(".owl").slick("setPosition");
    }
    function l(t) {
      e('.vertical-menu a[href="' + t + '"]')
        .addClass("active_item")
        .parent()
        .siblings()
        .find("a")
        .removeClass("active_item");
    }
    t.each(function() {
      var t = e(this);
      t.data("originalClassList", t.attr("class"));
    }),
      i(),
      (function() {
        var n = window.location.hash;
        if (e(n).length) {
          if (((o = e(n).index()), e(s).index() != o)) {
            if (r) return !1;
            a > 33 && (a = 1), g(a), ++a, i(), l(n);
          }
        } else t.eq(0).addClass("current_sec");
      })(),
      e('.vertical-menu a:not([href^="http"],[href^="www"]),.goToSec').on(
        "click",
        function(t) {
          t.preventDefault();
          var n = e(this).attr("href");
          if (((o = e(n).index()), e(s).index() != o)) {
            if (r) return !1;
            l(n), a > 33 && (a = 1), g(a), ++a, i();
          }
        }
      );
  }
  function g(a) {
    var d = a.animation ? a.animation : a;
    if (r) return !1;
    (r = !0),
      e(n).addClass("animating"),
      e(s).length || t.eq(i).addClass("current_sec");
    var g = e(s),
      u = t.eq(o).addClass("current_sec"),
      v = "",
      h = "";
    switch (d) {
      case 1:
        (v = "pt-page-rotateRightSideFirst"),
          (h = "pt-page-moveFromRight pt-page-delay200 pt-page-ontop");
        break;
      case 2:
        (v = "pt-page-rotateLeftSideFirst"),
          (h = "pt-page-moveFromLeft pt-page-delay200 pt-page-ontop");
        break;
      case 3:
        (v = "pt-page-rotateBottomSideFirst"),
          (h = "pt-page-moveFromBottom pt-page-delay200 pt-page-ontop");
        break;
      case 4:
        (v = "pt-page-flipOutRight"),
          (h = "pt-page-flipInLeft pt-page-delay500");
        break;
      case 5:
        (v = "pt-page-flipOutLeft"),
          (h = "pt-page-flipInRight pt-page-delay500");
        break;
      case 6:
        (v = "pt-page-scaleDownCenter"),
          (h = "pt-page-scaleUpCenter pt-page-delay400");
        break;
      case 7:
        (v = "pt-page-rotateFall pt-page-ontop"), (h = "pt-page-scaleUp");
        break;
      case 8:
        (v = "pt-page-rotateOutNewspaper"),
          (h = "pt-page-rotateInNewspaper pt-page-delay500");
        break;
      case 9:
        (v = "pt-page-rotatePushLeft"), (h = "pt-page-moveFromRight");
        break;
      case 10:
        (v = "pt-page-rotatePushRight"), (h = "pt-page-moveFromLeft");
        break;
      case 11:
        (v = "pt-page-rotatePushTop"), (h = "pt-page-moveFromBottom");
        break;
      case 12:
        (v = "pt-page-rotateFoldLeft"), (h = "pt-page-moveFromRightFade");
        break;
      case 13:
        (v = "pt-page-rotateFoldRight"), (h = "pt-page-moveFromLeftFade");
        break;
      case 14:
        (v = "pt-page-rotateFoldTop"), (h = "pt-page-moveFromBottomFade");
        break;
      case 15:
        (v = "pt-page-moveToRightFade"), (h = "pt-page-rotateUnfoldLeft");
        break;
      case 16:
        (v = "pt-page-moveToLeftFade"), (h = "pt-page-rotateUnfoldRight");
        break;
      case 17:
        (v = "pt-page-moveToBottomFade"), (h = "pt-page-rotateUnfoldTop");
        break;
      case 18:
        (v = "pt-page-rotateRoomLeftOut pt-page-ontop"),
          (h = "pt-page-rotateRoomLeftIn");
        break;
      case 19:
        (v = "pt-page-rotateRoomRightOut pt-page-ontop"),
          (h = "pt-page-rotateRoomRightIn");
        break;
      case 20:
        (v = "pt-page-rotateCubeLeftOut pt-page-ontop"),
          (h = "pt-page-rotateCubeLeftIn");
        break;
      case 21:
        (v = "pt-page-rotateCubeRightOut pt-page-ontop"),
          (h = "pt-page-rotateCubeRightIn");
        break;
      case 22:
        (v = "pt-page-rotateSidesOut"),
          (h = "pt-page-rotateSidesIn pt-page-delay200");
        break;
      case 23:
        (v = "pt-page-scaleDown"), (h = "pt-page-moveFromBottom pt-page-ontop");
        break;
      case 24:
        (v = "pt-page-scaleDown"), (h = "pt-page-scaleUpDown pt-page-delay300");
        break;
      case 25:
        (v = "pt-page-scaleDownUp"), (h = "pt-page-scaleUp pt-page-delay300");
        break;
      case 26:
        (v = "pt-page-moveToLeft pt-page-ontop"), (h = "pt-page-scaleUp");
        break;
      case 27:
        (v = "pt-page-moveToRight pt-page-ontop"), (h = "pt-page-scaleUp");
        break;
      case 28:
        (v = "pt-page-moveToBottom pt-page-ontop"), (h = "pt-page-scaleUp");
        break;
      case 29:
        (v = "pt-page-rotateSlideOut"), (h = "pt-page-rotateSlideIn");
        break;
      case 30:
        (v = "pt-page-moveToLeft"), (h = "pt-page-moveFromRight");
        break;
      case 31:
        (v = "pt-page-moveToRight"), (h = "pt-page-moveFromLeft");
        break;
      case 32:
        (v = "pt-page-moveToLeftFade"), (h = "pt-page-moveFromRightFade");
        break;
      case 33:
        (v = "pt-page-scaleDown"), (h = "pt-page-moveFromLeft pt-page-ontop");
    }
    g.addClass(v).on(c, function() {
      g.off(c), (l = !0), p && f(g, u);
    }),
      u.addClass(h).on(c, function() {
        u.off(c), (p = !0), l && f(g, u);
      }),
      m || f(g, u);
  }
  function f(a, i) {
    (l = !1),
      (p = !1),
      (function(e, a) {
        (window.location.hash = t.eq(o).attr("id")),
          e.attr("class", e.data("originalClassList")),
          a.attr("class", a.data("originalClassList") + " current_sec");
      })(a, i),
      (r = !1),
      e(n).removeClass("animating");
  }
  return d(), { init: d, nextPage: g };
});
$(function() {
  "use strict";
  var e = $(".grid"),
    t = "body";
  $(window).on("load", function() {
    e.isotope({
      itemSelector: ".grid .item",
      percentPosition: !0,
      masonry: { columnWidth: ".grid .item:first-of-type" }
    }),
      $(".portfolio ul li").on("click", function() {
        var t = $(this).attr("data-filter");
        e.isotope({ filter: t }),
          $(this)
            .addClass("active_filter")
            .siblings()
            .removeClass("active_filter");
      }),
      $(".startLoad").fadeOut("slow");
    var a = $(".content-wrapper h2"),
      o = a.length,
      i = 1;
    function n() {
      a
        .eq(i)
        .addClass("active animate")
        .siblings()
        .removeClass("active animate"),
        (i = i === o - 1 ? 0 : i + 1);
    }
    a.eq(i),
      a.eq(0).addClass("active animate"),
      setInterval(function() {
        if ($(t).hasClass("side-menu")) {
          if ($("section.home").hasClass("current_sec")) {
            if ($(t).hasClass("animating")) return;
            n();
          }
        } else n();
      }, 3e3);
  }),
    $(".full_height").height($(window).height()),
    $(".my_img").length &&
      $(".my_img").magnificPopup({
        type: "image",
        removalDelay: 300,
        mainClass: "mfp-with-zoom",
        gallery: { enabled: !0 },
        zoom: { enabled: !0 }
      }),
    $(".video-popup").magnificPopup({ type: "iframe" });
  var a = "<div></div>";
  function o() {
    Modernizr.mq("(max-width: 991px)")
      ? $(t).addClass("mobileScreen")
      : $(t).removeClass("mobileScreen");
  }
  (a = $(a).addClass(
    "mfp-wrap mfp-close-btn-in mfp-auto-cursor portfolioAjaxContent animated mfp-ready"
  )),
    $(".ajax_popup").on("click", function(e) {
      e.preventDefault(),
        $(a).load($(this).attr("href"), function() {
          $(a).imagesLoaded(function() {
            $(a)
              .find(".ajax-popup")
              .append(
                '<button title="Close (Esc)" type="button" class="mfp-close close_single">×</button>'
              ),
              $(t).append(a),
              $(".close_single").on("click", function(e) {
                $(".mfp-wrap.portfolioAjaxContent").addClass("mfp-removing"),
                  setTimeout(function() {
                    $(".mfp-wrap.portfolioAjaxContent")
                      .removeClass("mfp-removing")
                      .remove();
                  }, 1300);
              });
          });
        });
    }),
    $(".contact form .submit").on("click", function() {
      $(".contact form .form-control").removeClass("errorForm"),
        $(".msg_success,.msg_error").css("display", "");
      var e = !1,
        t = $('.contact form input[type="text"]');
      ("" !== t.val() && " " !== t.val()) ||
        ((e = !0), $(t).addClass("errorForm"));
      var a = $('.contact form input[type="email"]');
      "" === a.val() || " " === a.val()
        ? ($(a).addClass("errorForm"), (e = !0))
        : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(a.val()) ||
          ($(a).addClass("errorForm"), (e = !0));
      var o = $(".contact form textarea");
      if (
        (("" !== o.val() && " " !== o.val()) ||
          ((e = !0), $(o).addClass("errorForm")),
        !0 === e)
      )
        return !1;
      var i = $(".contact form").serialize();
      return (
        $.ajax({
          type: "POST",
          url: $(".contact form").attr("action"),
          data: i,
          success: function(e) {
            "SENDING" === e
              ? $(".msg_success").fadeIn("slow")
              : $(".msg_error").fadeIn("slow");
          }
        }),
        !1
      );
    }),
    o(),
    $(window).on("resize", function() {
      o(), $(".full_height").height($(window).height()), p();
    }),
    null == $(t).data("owl_slick") &&
      ($(".owl").slick({
        infinite: !1,
        slidesToShow: 2,
        arrows: !1,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
      }),
      $(t).data("owl_slick", "active"),
      $(".prev-testi").on("click", function() {
        $(".owl").slick("slickPrev");
      }),
      $(".next-testi").on("click", function() {
        $(".owl").slick("slickNext");
      })),
    $(".menu a:not(.loading)").on("click", function(e) {
      var t = $(this);
      t.addClass("loading"),
        setTimeout(function() {
          e.preventDefault(),
            (mainOrSection = "main"),
            (current_sec = t.attr("href")),
            anim_sec(".content--intro");
        }, 300);
    }),
    $(".menu .item h3").each(function() {
      $(this).attr("hover-name", $(this).text());
    }),
    $(".backToHome").on("click", function() {
      mainOrSection = "section";
      var e = $(this)
        .parents(".content")
        .attr("id");
      anim_sec("#" + e);
    }),
    (function() {
      if (!$(t).hasClass("side-menu")) {
        var e = window.location.hash;
        if ("#home" != e && "" != e) {
          if (!$(e).length) return;
          (mainOrSection = "main"),
            (current_sec = $(e)),
            anim_sec(".content--intro");
        }
      }
    })(),
    $(".mob-menu .navbar-toggle,.mob-menu-overlay,.mob-menu-close").on(
      "click",
      function() {
        $(".mob-menu-overlay,.mob-menu-close").fadeToggle(),
          $(".side-left").toggleClass("open-side-left");
      }
    );
  var i = null;
  0 !== $(".contact #map").length &&
    ($(".contact #map").show(),
    (function(e, t, a) {
      var o = new google.maps.LatLng(40.712784, -74.005941);
      if (i) i.setCenter(o);
      else {
        var n = {
          zoom: 14,
          center: o,
          scrollwheel: !1,
          mapTypeControl: !1,
          streetViewControl: !1,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                { color: "#ffffff" },
                { lightness: 29 },
                { weight: 0.2 }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 18 }]
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 16 }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#dedede" }, { lightness: 21 }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                { visibility: "on" },
                { color: "#ffffff" },
                { lightness: 16 }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                { saturation: 36 },
                { color: "#333333" },
                { lightness: 40 }
              ]
            },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{ color: "#fefefe" }, { lightness: 20 }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                { color: "#fefefe" },
                { lightness: 17 },
                { weight: 1.2 }
              ]
            }
          ]
        };
        (i = new google.maps.Map(document.getElementById("map"), n)),
          new google.maps.Marker({
            position: o,
            icon: "assets/images/map-marker.png"
          }).setMap(i);
      }
    })());
  var n = !1;
  $(".about .grid__item-img").on("mouseenter", function(e) {
    n || ($(this).hover3d({ selector: "canvas" }), (n = !0));
  }),
    $(".skill").each(function() {
      $(this)
        .find(".progress_bar")
        .css(
          "width",
          $(this)
            .find(".percentage")
            .text()
        );
    });
  var s,
    r,
    l = function() {
      var e,
        t = !1;
      return (
        (e = navigator.userAgent || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          e
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            e.substr(0, 4)
          )) &&
          (t = !0),
        t
      );
    };
  function p() {
    $(t).hasClass("side-menu") &&
      !l() &&
      ($(".vertical-menu").height() + 72 < $(window).height()
        ? $(".side-left .slimScrollBar").addClass("hide")
        : $(".side-left .slimScrollBar").removeClass("hide"));
  }
  function c(e, t) {
    $(e)
      .find("span")
      .each(function(e, a) {
        TweenMax.to($(this), 0.4, {
          ease: Quad.easeOut,
          startAt: { y: 10, opacity: 0 },
          y: "0%",
          opacity: 1,
          color: "enter" === t ? $(".loader").css("color") : "#fff",
          delay: 0.02 * e
        });
      });
  }
  l() ||
    ($("section .scroll__content").each(function(e) {
      $(this).slimScroll({ height: "100%", opacity: "0.2" });
    }),
    $(".side-left .menu-wrapper").slimScroll({
      height: "100%",
      opacity: "0.2",
      color: "#fff"
    })),
    p(),
    $(".menu li a").each(function(e) {
      $(this).lettering();
    }),
    $(".menu a").on({
      mouseenter: function() {
        c(this, "enter");
      },
      mouseleave: function() {
        c(this, "leave");
      }
    }),
    (s = $(".job h2")),
    (r = $(".fit--text")),
    s.length && s.fitText(1, { maxFontSize: 70 }),
    r.length && r.fitText(1, { maxFontSize: 60 }),
    $("#typed").length &&
      new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 90,
        backSpeed: 0,
        backDelay: 700,
        startDelay: 200,
        fadeOut: !1,
        loop: !0,
        showCursor: !1
      });
  $("body").append(
    '<div class="options_box animate_options_box"><div class="cog"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div><div class="options"><h4>select color</h4><div class="colors_box"><div><span class="color2 c__check" data-theme="color-yellow.css" title="Yellow"></span><span class="color1" data-theme="color-pink.css" title="pink"></span><span class="color3" data-theme="color-purple.css" title="Purple"></span></div><div><span class="color4" data-theme="color-green.css" title="Green"></span><span class="color5" data-theme="color-red.css" title="Red"></span><span class="color6" data-theme="color-blue.css" title="Blue"></span></div></div></div></div>'
  ),
    $(".options_box .cog").on("click", function() {
      $(".options_box").toggleClass("animate_options_box");
    }),
    $(".colors_box span").on("click", function() {
      var e = $(this).data("theme");
      $(".colors_box span").removeClass("c__check"),
        $(this).addClass("c__check"),
        "default" === e
          ? $(".new_color").remove()
          : 0 === $(".new_color").length
          ? $("head").append(
              '<link rel="stylesheet" href="assets/css/' +
                e +
                '" class="new_color">'
            )
          : $(".new_color").attr("href", "assets/css/" + e);
    }),
    $(window).on("load", function() {
      setTimeout(function() {
        $(".options_box").removeClass("animate_options_box");
      }, 4e3);
    });
});
