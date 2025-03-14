import { useEffect, useState } from 'react';

// Supported ad networks
const AD_NETWORKS = {
  GOOGLE: 'google',
  MEDIA_NET: 'medianet',
  AMAZON: 'amazon'
};

const AdSpace = ({ position, type = AD_NETWORKS.GOOGLE }) => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Initialize ads based on type
    switch (type) {
      case AD_NETWORKS.GOOGLE:
        // Google AdSense implementation
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
        break;
      case AD_NETWORKS.MEDIA_NET:
        // Media.net implementation
        if (window._medianet) {
          window._medianet.load();
        }
        break;
      case AD_NETWORKS.AMAZON:
        // Amazon ads implementation
        if (window.amzn_assoc_placement) {
          window.amzn_assoc_placement.push({});
        }
        break;
    }
    setAdLoaded(true);
  }, [type]);

  const adClass = position === 'top' 
    ? 'w-full h-24 mb-8'
    : position === 'sidebar' 
      ? 'w-64 h-[600px] hidden xl:block'
      : 'w-full h-[250px] my-8';

  return (
    <div className={`${adClass} overflow-hidden`}>
      {type === AD_NETWORKS.GOOGLE && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-YOUR_CLIENT_ID"
          data-ad-slot="YOUR_AD_SLOT"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
      {type === AD_NETWORKS.MEDIA_NET && (
        <div 
          className="medianet-ads" 
          data-publisher="YOUR_PUBLISHER_ID"
          data-position={position}
        />
      )}
      {type === AD_NETWORKS.AMAZON && (
        <div 
          className="amazon-ads"
          data-amzn-id="YOUR_AMAZON_ID"
          data-position={position}
        />
      )}
    </div>
  );
};

export default AdSpace;