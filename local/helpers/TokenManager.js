"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenManager {
    static encode(data) {
        return jsonwebtoken_1.default.sign(data, this.secret, { algorithm: 'HS256' });
    }
    static decode(token) {
        return jsonwebtoken_1.default.decode(token, { json: true });
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, this.secret, {});
    }
}
exports.default = TokenManager;
TokenManager.secret = "NP5vy82*r6TYwfYGWS3vDpj?4H&LCBGgT!LSu^hCa%C?P6n9u#R%Bj*Hqa65UgFd#J-Cd2fjhJ2k-Pv8_2!!bcRZAHQxmySMF%cD=MdLtbv5@Lmm&$b$NVh$sf!bdHs=hAd+%9NncvQTzyLDsB_cd4W#3sJr6A$&=5F6fbCAWd#Vz$Z_H39*-56e*udT6&SHcWBxs?cSD%Z9KULmaYL$CtGkfwQ9LbEAG$CpAapPuK&ykp2a-WRNqh%GJ_#E6-+$X5kXKU%dsDhvUqqYUC^D22VBmQ-Q$v8J?^NhGq9k=_VcQm=xshmKRw92V_^^@6UmXyxD-+DPkqqkTzu$Qd?5j=r?MnRHXyBV3Z!ds^4k^U%uys@&tB9ULhdb*3NmXeKAHu3q5Yrt@6Bd_kHEtHg@#+2xKMNzqa_&cz!#Qx?JGrHVy$F?zHmVzEZ&e#PUAjh8drmK@zu-tP%Zp7mMfmHDEBu4328w9d-qYFVeXfeTbMB2dmw_c_ELn5E-QPx!_JS#E=B+ut9TncjHwM9@Sgx?WQm-#m&$c4d_yjRRRK$7RDN3vE?#NsP+FzPHWeh&fDgt!LUa#FPc_B47xNT=sNCj@5^trHLJrbXEC37-+QDYHsTjEKax++Xj8!ydD&5snjPRY4e?QaShfDXJDd9y6DEeW8$M*b4$Jxsy3TBpj#Jsns*2mx*J*2a-XGFeYN3&&s*8gTfwMq=cP*WzMH82JW%jqnHr!ju$TtBfJbmc%-zjkme+cKJs%p+5vLq-yqqAXC?dPnX42f4WhyD_dYg84R_eq%wtLx-r=v5ahv%g!bLS3@8ehh3MFpmZ-w7z#tFkX#&cC7SW-S@4dBRkYc&Dk9#v&ZT^_jfkAKQ4ns3@mCgu#%FWs?fHUW6a&+MwfLP9db#cWBNtMMLmmhQb_&KCt2%4KmKj*SsUg9Y3^nh+u7&Z*dVg3wmc_pBRMSUZ*8X7u9^^ZF@YjYyx+qaeGb@aYB-7Vcg2V_3e3*Q+MqzD&7%#Q-?KksvbmA@TAdpsbXUWGwRWdv&%!D^y7TkuTy!+bHq4k=&EjLhe4d#E8b8+ZLAPtxvbcv^D7gq2mh7kUFa%9en&XEuQWX?V#*8-s=BAA2GAtpS3m=bn*#9g^TjS&GFVXYW!YdZt9Ft&+%qfazUvr4wPJULuuS-a8yp&?xCzJuq3T%Bhr@3LP!4*T-APKsSu2D*TW8nEVk=eNbY#=?km*qVf3bbyX#Lm2uyRn=G?-dEgd7s9qt7XhU7k5WMqXVK5DG**4e&D+GXTav$g-FyBsGLAQLjD5HkuRf+*CWZMvK4c%GMpCy?Rbkc2^=wMR2$?_?@8-mxn#w=x$j!=6uJ^N2Z7CM4Tmp?KMJjbPL^55$Vh_kc_5uKCZYgJqX!Pv*DW&WenvsN3*wT$z75PnZb@z=JjB??LephmVKS4&m3ANw*3M87C#edrRvRmk34K9Pw=ueced8*dcdjpgK3%^QMRQ-qAkcW-RAqdvF&WHEbpg9tQ=xjAqqJt&sWS44dy_+Dyyt8s-sDzA3^ARn4h=54TPyppMHE4kYBmFgWhvZ+La!Ss$U5WWTvPFEQa897?gqrBgFy@CJ+6+jxJ*#7Xtb4?YSENU5bww$3mDgbD?qkRkyPXfmdWj#&Yk8=tNL^WfWww6qxR+=6Ext+T9ZbvQ&9w%tE?2VrnKK4ZxKg_!cKM3UWbYwNcekxxvmz86NzmM=?RBt4UJDEr&mPjfrwFGGJkRVJ9c%5Z&7Cpn%hREsFGJLsTH8F9KYXs7d*H#mHW_thrsx9SUCzCnv6FZ3E2B8ZYB^M6hDs%eVWA$U6aD*dyD3JTzrVzt5Rm+=^QBWfb^wE!Lq6uFWeJ&&z5bN*B@%cN6x3KRgrEd2ck*@5s5Bxb2+39HT*#6!3XQ7wU9vkSK@d2mhJf4GJzU8^uW4Hwa8A2J2x5DExb_@=?+je#AKEP8ch9pGmh$wAX@5k4U&E8Nvpz9_@89Jrjavqj&5H!Y@GgBt_*5#%5R_2u!D3v-2UUrXT-*JnGGjU@!AqBDG=wwr#6A2tWh=BZA#g^3j2*t%-VA6kD";
//# sourceMappingURL=TokenManager.js.map