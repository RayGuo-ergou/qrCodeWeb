import http from '@/common/http';
import * as qrTypes from '@/types/QRCode';

const QRCodeServices = {
  findMany(payload: qrTypes.QRFindManyPayload) {
    return http.get(`/api/qr?email=${payload.query.email}`);
  },

  findOne(payload: qrTypes.QRFindOnePayload) {
    return http.get(`/api/qr/${payload.id}?email=${payload.query.email}`);
  },

  generate(payload: qrTypes.QRGeneratePayload) {
    return http.post('/api/qr', payload.body);
  },

  update(payload: qrTypes.QRUpdatePayload) {
    return http.put(`/api/qr/${payload.id}`, payload.body);
  },

  verify(payload: qrTypes.QRVerifyPayload) {
    return http.post('/api/qr/scan', payload.body);
  },
};

export default QRCodeServices;
