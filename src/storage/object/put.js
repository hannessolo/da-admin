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
import { sourceRespObject } from '../../helpers/source.js';
import {putObjectWithVersion} from "../version/put.js";

async function getFileBody(data) {
  const text = await data.text();
  return { body: text, type: data.type };
}

function getObjectBody(data) {
  // TODO: This will not correctly handle HTML as data
  return { body: JSON.stringify(data), type: 'application/json' };
}

export default async function putObject(env, daCtx, obj) {
  const { org, key, propsKey } = daCtx;

  const fileText = await obj.data.text();

  console.log(fileText);

  const inputs = [];

  let status = 201;
  if (obj) {
    console.log('input obj');
    if (obj.data) {
      const isFile = obj.data instanceof File;
      console.log({isFile})
      const { body, type } = isFile ? await getFileBody(obj.data) : getObjectBody(obj.data);

      console.log(body)

      const result = await fetch('https://cf2html.hanneshertach490.workers.dev/author-p130360-e1463269/projects/demo-page', {
        method: 'POST',
        body,
      });

      status = await putObjectWithVersion(env, daCtx, {
        org, key, body, type,
      });
    }
  } else {
    const { body, type } = getObjectBody({});
    const inputConfig = {
      org, key: propsKey, body, type,
    };
    console.log('input config');
    console.log(inputConfig);
  }

  const body = sourceRespObject(daCtx);
  return { body: JSON.stringify(body), status, contentType: 'application/json' };
}
