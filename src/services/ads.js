// Google AdSense integration
export const initializeAds = () => {
  // Add Google AdSense script
  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT_ID}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
};

// Amazon Associates integration
export const initializeAmazonAds = () => {
  window.amzn_assoc_placement = "adunit0";
  window.amzn_assoc_tracking_id = process.env.AMAZON_TRACKING_ID;
  window.amzn_assoc_ad_mode = "auto";
  window.amzn_assoc_default_category = "All";
  window.amzn_assoc_default_search_phrase = "";
  window.amzn_assoc_linkid = "unique-id";
  
  const script = document.createElement('script');
  script.src = "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US";
  script.async = true;
  document.head.appendChild(script);
};

// Media.net integration
export const initializeMediaNet = () => {
  window._medianet_crid = process.env.MEDIANET_CRID;
  
  const script = document.createElement('script');
  script.src = "//contextual.media.net/dmedianet.js?cid=" + process.env.MEDIANET_CID;
  script.async = true;
  document.head.appendChild(script);
};