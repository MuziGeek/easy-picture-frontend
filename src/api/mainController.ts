// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** health GET /api/health */
export async function healthUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/health', {
    method: 'GET',
    ...(options || {}),
  })
}

/** health111 GET /api/health111 */
export async function health111UsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/health111', {
    method: 'GET',
    ...(options || {}),
  })
}
