"use client";

// https://www.zoho.com/salesiq/help/developer-section/js-api-chat-float-visibility.html

import React from "react";
import { useEffect } from "react";

const useScript = (url: string, widgetCode: string) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");

    const code = `var $zoho=$zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
      widgetcode: "${widgetCode}",
      values: {},
      ready: function() {
        $zoho.salesiq.floatbutton.position("right");
        $zoho.salesiq.floatbutton.visible("show");
      }
    };
    var d=document;
    s=d.createElement("script");
    s.type="text/javascript";
    s.id="zsiqscript";
    s.defer=true;
    s.src="${url}";
    t=d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s,t);
    d.innerHTML = "<div id='zsiqwidget'></div>";`;

    script.appendChild(document.createTextNode(code));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default function SalesIQ() {
  return <>{useScript("https://salesiq.zoho.com/widget", "siqce7b523dfa94fa925d17add9c4a7bcca")}</>;
}
