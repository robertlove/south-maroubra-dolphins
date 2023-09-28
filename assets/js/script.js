---
layout: null
---

{%- include_relative bootstrap.bundle.min.js -%}
{%- assign events = site.data.events -%}
{% assign next_year = site.data.events.last.date | date: '%Y' | plus: 1 %}

const nextEvent = document.getElementById('next-event');

if (nextEvent) {

  const events = [{% for event in events %}
    {
      date: "{{- event.date | date: site.date_format | replace: '  ', ' ' -}}",
      datetime: "{{- event.date | date: '%FT%T.%L%z' -}}",
      description: {% if event.description %}"{{- event.description | escape -}}"{% else %}null{% endif %},
      location: "{{- event.location.name | escape -}}",
      url: "{{- '/events' | relative_url -}}#{{- event.date | date: '%F' -}}"
    }{% unless forloop.last %},{%- endunless -%}
  {% endfor %}
  ];

  const now = Date.now();

  let html = `There are no upcoming events at this time. Come <a href="{{- '/' | relative_url -}}#membership" class="text-reset fs-6">join us</a> for the {{ next_year }} winter swimming season.`;

  for (const i in events) {

    let event = events[i];
    let datetime = Date.parse(event.datetime);

    if (datetime >= now) {

      text = '';

      if (event.description) {
        text = `${event.description} on `;
      }

      text += `${event.date} at ${event.location}`;
      html = `<a href="${event.url}" class="text-reset fs-6">${text}</a>`;
      break;

    }
  }

  nextEvent.innerHTML = html;

}
