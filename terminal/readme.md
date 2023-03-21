[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>

# Terminal

## Shell Snippets

### Find all files with a certain extension and write to a file

I wanted to create a list of TypeScript files to go through them and read them. This was the command
I used and worked great.

```sh
find . -name '*.ts' -not -path "./node_modules/*" -not -name "*.d.ts" > typescript_files.txt
```

[[↑] Back to top](#top)
