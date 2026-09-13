(function ($) {
    "use strict";

    $("#spinner").removeClass("show").hide();

    if (typeof WOW === "function") {
        new WOW().init();
    }

    var $header = $("#siteHeader");
    var $hero = $("#hero");
    var onScroll = function () {
        var y = $(window).scrollTop();
        if (y > 12) {
            $header.addClass("is-scrolled");
            $(".back-to-top").addClass("show");
        } else {
            $header.removeClass("is-scrolled");
            $(".back-to-top").removeClass("show");
        }
        if ($("body").hasClass("home") && $hero.length) {
            var passed = y > Math.max(40, $hero.outerHeight() - 80);
            $header.toggleClass("over-hero", !passed);
        }
    };
    if ($("body").hasClass("home")) {
        $header.addClass("over-hero");
    }
    $(window).on("scroll", onScroll);
    onScroll();

    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
        $(".reveal").addClass("in");
    }

    var $words = $("#wordSwap b");
    if ($words.length) {
        var wi = 0;
        setInterval(function () {
            $words.eq(wi).removeClass("is-on");
            wi = (wi + 1) % $words.length;
            $words.eq(wi).addClass("is-on");
        }, 2200);
    }

    $(".nav-toggle").on("click", function () {
        $("#siteNav").toggleClass("open");
        $(this).attr("aria-expanded", $("#siteNav").hasClass("open"));
    });

    $(".back-to-top").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 700);
    });

    if ($.fn.counterUp) {
        $("[data-toggle='counter-up']").counterUp({ delay: 10, time: 1600 });
    }

    $(".filters").on("click", "button", function () {
        var filter = $(this).data("filter");
        $(".filters button").removeClass("is-active");
        $(this).addClass("is-active");
        if ($(".archive-block").length) {
            if (filter === "*") {
                $(".archive-block").removeClass("is-hidden");
            } else {
                $(".archive-block").each(function () {
                    $(this).toggleClass("is-hidden", $(this).data("cat") !== filter);
                });
                var $target = $(".archive-block[data-cat='" + filter + "']");
                if ($target.length) {
                    $("html, body").animate({ scrollTop: Math.max(0, $target.offset().top - 88) }, 450);
                }
            }
        } else if (filter === "*") {
            $(".gallery a").removeClass("is-hidden");
        } else {
            $(".gallery a").each(function () {
                var cats = ($(this).data("cat") || "").toString();
                $(this).toggleClass("is-hidden", cats.indexOf(filter) === -1);
            });
        }
    });

    $("form.form-shell form, .form-shell form").on("submit", function (e) {
        e.preventDefault();
        var name = $.trim($("#name").val() || "");
        var school = $.trim($("#school").val() || "");
        var space = $.trim($("#space").val() || "");
        var message = $.trim($("#message").val() || "");
        var text = ["Hello Forjalab,", name && ("Name: " + name), school && ("School: " + school), space && ("Space: " + space), message && ("Details: " + message)].filter(Boolean).join("\n");
        window.location.href = "https://wa.me/2349157545966?text=" + encodeURIComponent(text);
    });

    if ($.fn.owlCarousel && $(".testimonial-carousel").length) {
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 900,
            items: 1,
            dots: true,
            loop: true,
            margin: 16
        });
    }
})(jQuery);
