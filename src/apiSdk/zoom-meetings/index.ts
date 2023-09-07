import axios from 'axios';
import queryString from 'query-string';
import { ZoomMeetingInterface, ZoomMeetingGetQueryInterface } from 'interfaces/zoom-meeting';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getZoomMeetings = async (
  query?: ZoomMeetingGetQueryInterface,
): Promise<PaginatedInterface<ZoomMeetingInterface>> => {
  const response = await axios.get('/api/zoom-meetings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createZoomMeeting = async (zoomMeeting: ZoomMeetingInterface) => {
  const response = await axios.post('/api/zoom-meetings', zoomMeeting);
  return response.data;
};

export const updateZoomMeetingById = async (id: string, zoomMeeting: ZoomMeetingInterface) => {
  const response = await axios.put(`/api/zoom-meetings/${id}`, zoomMeeting);
  return response.data;
};

export const getZoomMeetingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/zoom-meetings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteZoomMeetingById = async (id: string) => {
  const response = await axios.delete(`/api/zoom-meetings/${id}`);
  return response.data;
};
