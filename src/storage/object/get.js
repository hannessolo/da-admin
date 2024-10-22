/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
export default async function getObject(env, { org, key }, head = false) {
  // TODO mapping from org and key to the correct worker/author url. Config json file?
  const result = await fetch('https://cf2html.hanneshertach490.workers.dev/author-p130360-e1463269/projects/demo-page');

  const text = await result.text();

  if (!head) {
    console.log('returning non-head')
    try {
      return {
        body: text,
        status: 200,
      };
    } catch (e) {
      return { body: '', status: e.$metadata?.httpStatusCode || 404, contentLength: 0 };
    }
  }
  console.log('returning head')

  return {
    body: '',
    status: 200,
  };
}
