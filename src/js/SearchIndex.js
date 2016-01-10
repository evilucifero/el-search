import React from 'react';
import ResultItem from './ResultItem';

export default React.createClass({
  getInitialState() {
    return {
      keyword: '',
      result: [],
      summary: { count: 0 },
      isInitial: true,
      isLoading: false
    }
  },

  handleChange(e) {
    this.setState({ keyword: e.target.value.trim() })
  },

  handleSearch() {
    const { keyword } = this.state;

    if (!keyword) {
      this.setState({ isInitial: true, isLoading: false });
    }
    else {
      this.setState({
        isInitial: false,
        isLoading: true
      });
      fetch(
        '/search?keyword=' + encodeURIComponent(keyword), { method: 'GET' }
      ).then((response) => {
        setTimeout(()=>{
          this.setState({
            isLoading: false,
            result: [
              { title: keyword + 'sdqwuncebuwrvwoc', url: 'dqwnuifenfi', summary: keyword + 'ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq 千山尿肥觉烷烃仁宗咩ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ' },
              { title: keyword + 'sdqwuncebuwrvwoc', url: 'dqwnuifenfi', summary: keyword + 'ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq 千山尿肥觉烷烃仁宗咩ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ' },
              { title: keyword + 'sdqwuncebuwrvwoc', url: 'dqwnuifenfi', summary: keyword + 'ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq 千山尿肥觉烷烃仁宗咩ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ' },
              { title: keyword + 'sdqwuncebuwrvwoc', url: 'dqwnuifenfi', summary: keyword + 'ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq 千山尿肥觉烷烃仁宗咩ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ' },
              { title: keyword + 'sdqwuncebuwrvwoc', url: 'dqwnuifenfi', summary: keyword + 'ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq 千山尿肥觉烷烃仁宗咩ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ' },
              { title: keyword + 'sdqwuncebuwrvwoc', url: 'dqwnuifenfi', summary: keyword + 'ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq 千山尿肥觉烷烃仁宗咩ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ffewijfewopq ' },
            ],
            summary: {
              count: 6
            }
          });
        }, 451);
      })
    }
  },

  renderInitial() {
    const { keyword } = this.state;

    return (
      <div className="initial">
        <h1 className="title-area">
          <span className="title">Search</span>
          <span className="subtitle">搜索引擎</span>
        </h1>
        <div className="input-area">
          <input type="text" onChange={this.handleChange} value={keyword}/>
          <a className="btn" href="#" onClick={this.handleSearch}>搜 索</a>
        </div>
      </div>
    );
  },

  renderResult() {
    const {keyword, result, summary, isLoading} = this.state;

    return (
      <div className="result">
        <div className="header-area">
          <span className="title">Search</span>
          <input type="text" onChange={this.handleChange} value={keyword}/>
          <a className="btn" href="#" onClick={this.handleSearch}>搜 索</a>
        </div>
        <div className="result-area">
          {
            isLoading ? (
              <div className="loading">
                <h2>正在搜索...</h2>
              </div>
            ) : [
              <div className="result-summary">
                Search搜索引擎共为你找到&nbsp;{summary.count}&nbsp;条记录
              </div>,
              <ol className="result-list">
                { result.map((v, i) => (
                  <li key={i}>
                    <ResultItem title={v.title} url={v.url} summary={v.summary} />
                  </li>
                )) }
              </ol>
            ]
          }
        </div>
      </div>
    );
  },

  render() {
    return this.state.isInitial ? this.renderInitial() : this.renderResult();
  }
});
