// This is a TextMate grammar distributed by `starry-night`.
// This grammar is licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  dependencies: ['source.js', 'text.html.basic'],
  extensions: ['.jade', '.pug'],
  names: ['pug'],
  patterns: [
    {
      match: '^(!!!|doctype)(\\s*[a-zA-Z0-9-_]+)?',
      name: 'meta.tag.sgml.doctype.html'
    },
    {
      begin: '^(\\s*)//-',
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'comment.unbuffered.block.jade'
    },
    {
      begin: '^(\\s*)//',
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'string.comment.buffered.block.jade',
      patterns: [
        {
          captures: {1: {name: 'invalid.illegal.comment.comment.block.jade'}},
          match: '^\\s*(//)(?!-)',
          name: 'string.comment.buffered.block.jade'
        }
      ]
    },
    {
      begin: '<!--',
      end: '--\\s*>',
      name: 'comment.unbuffered.block.jade',
      patterns: [
        {match: '--', name: 'invalid.illegal.comment.comment.block.jade'}
      ]
    },
    {
      begin: '^(\\s*)-$',
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'source.js',
      patterns: [{include: 'source.js'}]
    },
    {
      begin:
        '^(\\s*)(script)((\\.$)|(?=[^\\n]*(text|application)/javascript.*\\.$))',
      beginCaptures: {2: {name: 'entity.name.tag.jade'}},
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'meta.tag.other',
      patterns: [
        {
          begin: '\\G(?=\\()',
          end: '$',
          patterns: [{include: '#tag_attributes'}]
        },
        {
          begin: '\\G(?=[.#])',
          end: '$',
          patterns: [{include: '#complete_tag'}]
        },
        {include: 'source.js'}
      ]
    },
    {
      begin: '^(\\s*)(style)((\\.$)|(?=[.#(].*\\.$))',
      beginCaptures: {2: {name: 'entity.name.tag.jade'}},
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'meta.tag.other',
      patterns: [
        {
          begin: '\\G(?=\\()',
          end: '$',
          patterns: [{include: '#tag_attributes'}]
        },
        {
          begin: '\\G(?=[.#])',
          end: '$',
          patterns: [{include: '#complete_tag'}]
        },
        {include: 'source.css'}
      ]
    },
    {
      begin: '^(\\s*):(sass)(?=\\(|$)',
      beginCaptures: {2: {name: 'constant.language.name.sass.filter.jade'}},
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'source.sass.filter.jade',
      patterns: [{include: '#tag_attributes'}, {include: 'source.sass'}]
    },
    {
      begin: '^(\\s*):(less)(?=\\(|$)',
      beginCaptures: {2: {name: 'constant.language.name.less.filter.jade'}},
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'source.less.filter.jade',
      patterns: [{include: '#tag_attributes'}, {include: 'source.css.less'}]
    },
    {
      begin: '^(\\s*):(stylus)(?=\\(|$)',
      beginCaptures: {2: {name: 'constant.language.name.stylus.filter.jade'}},
      end: '^(?!(\\1\\s)|\\s*$)',
      patterns: [{include: '#tag_attributes'}, {include: 'source.stylus'}]
    },
    {
      begin: '^(\\s*):(coffee(-?script)?)(?=\\(|$)',
      beginCaptures: {
        2: {name: 'constant.language.name.coffeescript.filter.jade'}
      },
      end: '^(?!(\\1\\s)|\\s*$)',
      name: 'source.coffeescript.filter.jade',
      patterns: [{include: '#tag_attributes'}, {include: 'source.coffee'}]
    },
    {
      begin: '^(\\s*)((:(?=.))|(:$))',
      beginCaptures: {4: {name: 'invalid.illegal.empty.generic.filter.jade'}},
      end: '^(?!(\\1\\s)|\\s*$)',
      patterns: [
        {
          begin: '\\G(?<=:)(?=.)',
          end: '$',
          name: 'name.generic.filter.jade',
          patterns: [
            {match: '\\G\\(', name: 'invalid.illegal.name.generic.filter.jade'},
            {
              match: '[\\w-]',
              name: 'constant.language.name.generic.filter.jade'
            },
            {include: '#tag_attributes'},
            {match: '\\W', name: 'invalid.illegal.name.generic.filter.jade'}
          ]
        }
      ]
    },
    {
      begin:
        '^(\\s*)(?=[\\w.#].*?\\.$)(?=(?:(?:(?:(?:(?:#[\\w-]+)|(?:\\.[\\w-]+))|(?:(?:[#!]\\{[^}]*\\})|(?:\\w(?:(?:[\\w:-]+[\\w-])|(?:[\\w-]*)))))(?:(?:#[\\w-]+)|(?:\\.[\\w-]+)|(?:\\((?:[^()\\\'\\"]*(?:(?:\\\'(?:[^\\\']|(?:(?<!\\\\)\\\\\\\'))*\\\')|(?:\\"(?:[^\\"]|(?:(?<!\\\\)\\\\\\"))*\\")))*[^()]*\\))*)*)(?:(?:(?::\\s+)|(?<=\\)))(?:(?:(?:(?:#[\\w-]+)|(?:\\.[\\w-]+))|(?:(?:[#!]\\{[^}]*\\})|(?:\\w(?:(?:[\\w:-]+[\\w-])|(?:[\\w-]*)))))(?:(?:#[\\w-]+)|(?:\\.[\\w-]+)|(?:\\((?:[^()\\\'\\"]*(?:(?:\\\'(?:[^\\\']|(?:(?<!\\\\)\\\\\\\'))*\\\')|(?:\\"(?:[^\\"]|(?:(?<!\\\\)\\\\\\"))*\\")))*[^()]*\\))*)*))*)\\.$)(?:(?:(#[\\w-]+)|(\\.[\\w-]+))|((?:[#!]\\{[^}]*\\})|(?:\\w(?:(?:[\\w:-]+[\\w-])|(?:[\\w-]*)))))',
      beginCaptures: {
        2: {name: 'entity.other.attribute-name.id.jade'},
        3: {name: 'entity.other.attribute-name.class.jade'},
        4: {name: 'meta.tag.other entity.name.tag.jade'}
      },
      end: '^(?!(\\1\\s)|\\s*$)',
      patterns: [
        {include: '#tag_attributes'},
        {include: '#complete_tag'},
        {
          begin: '^(?=.)',
          end: '$',
          name: 'text.block.jade',
          patterns: [
            {include: '#inline_jade'},
            {include: '#embedded_html'},
            {include: '#html_entity'},
            {include: '#interpolated_value'},
            {include: '#interpolated_error'}
          ]
        }
      ]
    },
    {
      begin: '^\\s*',
      end: '$',
      patterns: [
        {include: '#inline_jade'},
        {include: '#blocks_and_includes'},
        {include: '#unbuffered_code'},
        {include: '#mixin_definition'},
        {include: '#mixin_call'},
        {include: '#flow_control'},
        {include: '#case_conds'},
        {
          begin: '\\|',
          end: '$',
          name: 'text.block.pipe.jade',
          patterns: [
            {include: '#inline_jade'},
            {include: '#embedded_html'},
            {include: '#html_entity'},
            {include: '#interpolated_value'},
            {include: '#interpolated_error'}
          ]
        },
        {include: '#printed_expression'},
        {
          begin: '\\G(?=(#[^\\{\\w-])|[^\\w.#])',
          end: '$',
          patterns: [
            {
              begin: '</?(?=[!#])',
              end: '>|$',
              patterns: [
                {include: '#inline_jade'},
                {include: '#interpolated_value'},
                {include: '#interpolated_error'}
              ]
            },
            {include: '#inline_jade'},
            {include: '#embedded_html'},
            {include: '#html_entity'},
            {include: '#interpolated_value'},
            {include: '#interpolated_error'}
          ]
        },
        {include: '#complete_tag'}
      ]
    }
  ],
  repository: {
    babel_parens: {
      begin: '\\(',
      end: '\\)|(({\\s*)?$)',
      patterns: [{include: '#babel_parens'}, {include: 'source.js'}]
    },
    blocks_and_includes: {
      captures: {
        1: {name: 'storage.type.import.include.jade'},
        4: {name: 'variable.control.import.include.jade'}
      },
      match:
        '(extends|include|yield|append|prepend|block( (append|prepend))?)\\s+(.*)$',
      name: 'meta.first-class.jade'
    },
    case_conds: {
      begin: '(default|when)((\\s+|(?=:))|$)',
      captures: {1: {name: 'storage.type.function.jade'}},
      end: '$',
      name: 'meta.control.flow.jade',
      patterns: [
        {
          begin: '\\G(?!:)',
          end: '(?=:\\s+)|$',
          name: 'js.embedded.control.flow.jade',
          patterns: [{include: '#case_when_paren'}, {include: 'source.js'}]
        },
        {
          begin: ':\\s+',
          end: '$',
          name: 'tag.case.control.flow.jade',
          patterns: [{include: '#complete_tag'}]
        }
      ]
    },
    case_when_paren: {
      begin: '\\(',
      end: '\\)',
      name: 'js.when.control.flow.jade',
      patterns: [
        {include: '#case_when_paren'},
        {match: ':', name: 'invalid.illegal.name.tag.jade'},
        {include: 'source.js'}
      ]
    },
    complete_tag: {
      begin: '(?=[\\w.#])|(:\\s*)',
      end: '(\\.?$)|(?=:.)',
      patterns: [
        {include: '#blocks_and_includes'},
        {include: '#unbuffered_code'},
        {include: '#mixin_call'},
        {include: '#flow_control'},
        {match: '(?<=:)\\w.*$', name: 'invalid.illegal.name.tag.jade'},
        {include: '#tag_name'},
        {include: '#tag_id'},
        {include: '#tag_classes'},
        {include: '#tag_attributes'},
        {include: '#tag_mixin_attributes'},
        {
          captures: {
            2: {name: 'invalid.illegal.end.tag.jade'},
            4: {name: 'invalid.illegal.end.tag.jade'}
          },
          match: '((\\.)\\s+$)|((:)\\s*$)'
        },
        {include: '#printed_expression'},
        {include: '#tag_text'}
      ]
    },
    embedded_html: {
      begin: '(?=<[^>]*>)',
      end: '$|(?=>)',
      name: 'html',
      patterns: [
        {include: 'text.html.basic'},
        {include: '#interpolated_value'},
        {include: '#interpolated_error'}
      ]
    },
    flow_control: {
      begin: '(for|if|else if|else|each|until|while|unless|case)(\\s+|$)',
      captures: {1: {name: 'storage.type.function.jade'}},
      end: '$',
      name: 'meta.control.flow.jade',
      patterns: [
        {
          end: '$',
          name: 'js.embedded.control.flow.jade',
          patterns: [{include: 'source.js'}]
        }
      ]
    },
    html_entity: {
      patterns: [
        {
          match: '(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)',
          name: 'constant.character.entity.html.text.jade'
        },
        {match: '[<>&]', name: 'invalid.illegal.html_entity.text.jade'}
      ]
    },
    inline_jade: {
      begin: '(?<!\\\\)(#\\[)',
      captures: {
        1: {name: 'entity.name.function.jade'},
        2: {name: 'entity.name.function.jade'}
      },
      end: '(\\])',
      name: 'inline.jade',
      patterns: [
        {include: '#inline_jade'},
        {include: '#mixin_call'},
        {
          begin: '(?<!\\])(?=[\\w.#])|(:\\s*)',
          end: '(?=\\]|(:.)|=|\\s)',
          name: 'tag.inline.jade',
          patterns: [
            {include: '#tag_name'},
            {include: '#tag_id'},
            {include: '#tag_classes'},
            {include: '#tag_attributes'},
            {include: '#tag_mixin_attributes'},
            {include: '#inline_jade'},
            {match: '\\[', name: 'invalid.illegal.tag.jade'}
          ]
        },
        {include: '#unbuffered_code'},
        {include: '#printed_expression'},
        {match: '\\[', name: 'invalid.illegal.tag.jade'},
        {include: '#inline_jade_text'}
      ]
    },
    inline_jade_text: {
      end: '(?=\\])',
      patterns: [
        {begin: '\\[', end: '\\]', patterns: [{include: '#inline_jade_text'}]},
        {include: '#inline_jade'},
        {include: '#embedded_html'},
        {include: '#html_entity'},
        {include: '#interpolated_value'},
        {include: '#interpolated_error'}
      ]
    },
    interpolated_error: {
      match: '(?<!\\\\)[#!]\\{(?=[^}]*$)',
      name: 'invalid.illegal.tag.jade'
    },
    interpolated_value: {
      begin: '(?<!\\\\)[#!]\\{(?=.*?\\})',
      end: '\\}',
      name: 'string.interpolated.jade',
      patterns: [
        {match: '{', name: 'invalid.illegal.tag.jade'},
        {include: 'source.js'}
      ]
    },
    js_braces: {
      begin: '\\{',
      end: '\\}',
      patterns: [{include: '#js_braces'}, {include: 'source.js'}]
    },
    js_brackets: {
      begin: '\\[',
      end: '\\]',
      patterns: [{include: '#js_brackets'}, {include: 'source.js'}]
    },
    js_parens: {
      begin: '\\(',
      end: '\\)',
      patterns: [{include: '#js_parens'}, {include: 'source.js'}]
    },
    mixin_call: {
      begin: '((?:mixin\\s+)|\\+)([\\w-]+)',
      beginCaptures: {
        1: {name: 'storage.type.function.jade'},
        2: {name: 'meta.tag.other entity.name.function.jade'}
      },
      end: '(?!\\()|$',
      patterns: [
        {
          begin: '(?<!\\))\\(',
          end: '\\)',
          name: 'args.mixin.jade',
          patterns: [
            {include: '#js_parens'},
            {include: '#string'},
            {
              captures: {
                1: {name: 'meta.tag.other entity.other.attribute-name.tag.jade'}
              },
              match: '([^\\s(),=/]+)\\s*=\\s*'
            },
            {include: 'source.js'}
          ]
        },
        {include: '#tag_attributes'}
      ]
    },
    mixin_definition: {
      captures: {
        1: {name: 'storage.type.function.jade'},
        2: {name: 'meta.tag.other entity.name.function.jade'},
        3: {name: 'punctuation.definition.parameters.begin.js'},
        4: {name: 'variable.parameter.function.js'},
        5: {name: 'punctuation.definition.parameters.begin.js'}
      },
      match:
        '(mixin\\s+)([\\w-]+)(?:(\\()\\s*((?:[a-zA-Z_]\\w*\\s*)(?:,\\s*[a-zA-Z_]\\w*\\s*)*)(\\)))?$'
    },
    printed_expression: {
      begin: '(!?\\=)\\s*',
      captures: {1: {name: 'constant'}},
      end: '(?=\\])|$',
      name: 'source.js',
      patterns: [{include: '#js_brackets'}, {include: 'source.js'}]
    },
    string: {
      begin: '([\'"])',
      end: '(?<!\\\\)\\1',
      name: 'string.quoted.jade',
      patterns: [
        {
          match: '\\\\((x[0-9a-fA-F]{2})|(u[0-9]{4})|.)',
          name: 'constant.character.quoted.jade'
        },
        {include: '#interpolated_value'},
        {include: '#interpolated_error'}
      ]
    },
    tag_attribute_name: {
      captures: {1: {name: 'entity.other.attribute-name.tag.jade'}},
      match: '([^\\s(),=/!]+)\\s*'
    },
    tag_attribute_name_paren: {
      begin: '\\(\\s*',
      end: '\\)',
      name: 'entity.other.attribute-name.tag.jade',
      patterns: [
        {include: '#tag_attribute_name_paren'},
        {include: '#tag_attribute_name'}
      ]
    },
    tag_attributes: {
      begin: '(\\(\\s*)',
      captures: {1: {name: 'constant.name.attribute.tag.jade'}},
      end: '(\\))',
      name: 'meta.tag.other',
      patterns: [
        {include: '#tag_attribute_name_paren'},
        {include: '#tag_attribute_name'},
        {match: '!(?!=)', name: 'invalid.illegal.tag.jade'},
        {
          begin: '=\\s*',
          end: '$|(?=,|(?:\\s+[^!%&*-+~|<>:?/])|\\))',
          name: 'attribute_value',
          patterns: [
            {include: '#string'},
            {include: '#js_parens'},
            {include: '#js_brackets'},
            {include: '#js_braces'},
            {include: 'source.js'}
          ]
        },
        {
          begin: '(?<=[%&*-+~|<>:?/])\\s+',
          end: '$|(?=,|(?:\\s+[^!%&*-+~|<>:?/])|\\))',
          name: 'attribute_value2',
          patterns: [
            {include: '#string'},
            {include: '#js_parens'},
            {include: '#js_brackets'},
            {include: '#js_braces'},
            {include: 'source.js'}
          ]
        }
      ]
    },
    tag_classes: {
      captures: {1: {name: 'invalid.illegal.tag.jade'}},
      match: '\\.([^\\w-])?[\\w-]*',
      name: 'entity.other.attribute-name.class.jade'
    },
    tag_id: {match: '#[\\w-]+', name: 'entity.other.attribute-name.id.jade'},
    tag_mixin_attributes: {
      begin: '(&attributes\\()',
      captures: {1: {name: 'entity.name.function.jade'}},
      end: '(\\))',
      name: 'meta.tag.other',
      patterns: [
        {match: 'attributes(?=\\))', name: 'storage.type.keyword.jade'},
        {include: 'source.js'}
      ]
    },
    tag_name: {
      begin: '([#!]\\{(?=.*?\\}))|(\\w(([\\w:-]+[\\w-])|([\\w-]*)))',
      end: '(\\G(?<!\\5[^\\w-]))|\\}|$',
      name: 'meta.tag.other entity.name.tag.jade',
      patterns: [
        {
          begin: '\\G(?<=\\{)',
          end: '(?=\\})',
          name: 'meta.tag.other entity.name.tag.jade',
          patterns: [
            {match: '{', name: 'invalid.illegal.tag.jade'},
            {include: 'source.js'}
          ]
        }
      ]
    },
    tag_text: {
      begin: '(?=.)',
      end: '$',
      patterns: [
        {include: '#inline_jade'},
        {include: '#embedded_html'},
        {include: '#html_entity'},
        {include: '#interpolated_value'},
        {include: '#interpolated_error'}
      ]
    },
    unbuffered_code: {
      begin: '(-|(([a-zA-Z0-9_]+)\\s+=))',
      beginCaptures: {3: {name: 'variable.parameter.javascript.embedded.jade'}},
      end: '(?=\\])|(({\\s*)?$)',
      name: 'source.js',
      patterns: [
        {include: '#js_brackets'},
        {include: '#babel_parens'},
        {include: 'source.js'}
      ]
    }
  },
  scopeName: 'text.jade'
}

export default grammar
