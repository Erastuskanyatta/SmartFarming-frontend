import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";

const SignedImage = ({ fileId, alt = "", className = "", fallback = null }) => {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        if (!fileId) return;
        ApiService.getSignedUrl(fileId)
            .then(res => {
                const url = typeof res.data === "string" ? res.data : res.data?.url ?? res.data?.signedUrl;
                setSrc(url);
            })
            .catch(() => setSrc(null));
    }, [fileId]);

    if (!fileId) return fallback;
    if (!src) return fallback;
    return <img src={src} alt={alt} className={className} />;
};

export default SignedImage;
