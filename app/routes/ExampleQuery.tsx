import { json, Form, useActionData, useTransition } from "remix";
import type { ActionFunction } from "remix";
import NetlifyGraph from "../../netlify/functions/netlifyGraph";
import invariant from "tiny-invariant";

export const action: ActionFunction = async (x) => {
const { request } = x;
  const formData = await request.formData();

  // By default, all API calls use no authentication
  let accessToken;

  //// If you want to use the API with your own access token:
  accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

  const ownerFormValue = formData.get("owner");
  invariant(typeof ownerFormValue === "string");
  const owner = ownerFormValue;

  const nameFormValue = formData.get("name");
  invariant(typeof nameFormValue === "string");
  const name = nameFormValue;

  const firstFormValue = formData.get("first");
  invariant(typeof firstFormValue === "string");
  const first = parseInt(firstFormValue);

  if (
    owner === undefined ||
    owner === null ||
    name === undefined ||
    name === null ||
    first === undefined ||
    first === null
  ) {
    return json(
      {
        errors: ["You must supply parameters for: `owner`, `name`, `first`"],
      },
      { status: 422 }
    );
  }

  const { errors, data } = await NetlifyGraph.fetchExampleQuery(
    { owner: owner, name: name, first: first },
    {accessToken:accessToken}
  );

  if (errors) {
    console.error(JSON.stringify(errors, null, 2));
  }

  console.log(JSON.stringify(data, null, 2));

  return json({ data, errors });
};

export default function handler() {
  const results = useActionData();
  const transition = useTransition();

  const errors = results?.errors;
  const data: NetlifyGraph.ExampleQuery["data"] = results?.data;
  let renderedIssues = null;

  if (data != null) {
    const issues = data.gitHub.repository.issues.nodes;
    renderedIssues = (<ul>{
      issues.map(issue => {
        const { author, url, bodyHTML, title } = issue;

        return (
          <li>
            <h3><a href={url}>{title}</a></h3>
            <h5><a href={`https://github.com/${author.login}`}>@{author.login}</a></h5>
            <div dangerouslySetInnerHTML={{ __html: bodyHTML as string }}/>
          </li>
        );
      })
      }</ul>);
  }


  return (
    <Form method="post">
      <p>
        <label htmlFor="owner">owner</label>
        <input id="owner" name="owner" type="text" />
      </p>
      <p>
        <label htmlFor="name">name</label>
        <input id="name" name="name" type="text" />
      </p>
      <p>
        <label htmlFor="first">first</label>
        <input id="first" name="first" type="number" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Submitting..." : "Run ExampleQuery"}
        </button>
      </p>

      {errors ? (
        <pre className="error">{JSON.stringify(errors, null, 2)}</pre>
      ) : null}
      {renderedIssues}
    </Form>
  );
}
