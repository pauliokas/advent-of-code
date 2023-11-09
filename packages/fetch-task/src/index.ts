import * as cheerio from 'cheerio';
import got from 'got';
import { NodeHtmlMarkdown } from 'node-html-markdown';

export type DownloadParams = {
  year: number;
  day: number;
  session: string;
};

export const fetchAssignment = async ({ year, day, session }: DownloadParams): Promise<string> => {
  const pageHtml = await got
    .get(`https://adventofcode.com/${year}/day/${day}`, { headers: { Cookie: `session=${session}` } })
    .text();
  const $ = cheerio.load(pageHtml);

  const htmlParts: string[] = [];
  $('article').each((idx, el) => {
    htmlParts.push($(el).html()!);
  });

  const nhm = new NodeHtmlMarkdown({});

  return htmlParts.map((html) => nhm.translate(html)).join('\n\n');
};

export const fetchExample = async ({ year, day, session }: DownloadParams): Promise<string> => {
  const pageHtml = await got
    .get(`https://adventofcode.com/${year}/day/${day}`, { headers: { Cookie: `session=${session}` } })
    .text();
  const $ = cheerio.load(pageHtml);

  return $('p:contains("example") + pre > code').first().text();
};

export const fetchInput = async ({ year, day, session }: DownloadParams): Promise<string> => {
  return got
    .get(`https://adventofcode.com/${year}/day/${day}/input`, { headers: { Cookie: `session=${session}` } })
    .text();
};
