"""Portable arithmetic/reference checks. Correct arithmetic does not verify inputs."""
import collections,json,pathlib
d=json.loads(pathlib.Path("deck-content.json").read_text())
assert sum([64,39,8,7,1])==119
assert sum([7,7,1,0])==15
assert sum([99,44,4,2,1])==150
assert sum([56,48,44,2])==150
assert [62185-60148,46153-45275,99776-18116]==[2037,878,81660]
assert round((47267.28/36480.87-1)*100,1)==29.6
assert d["slides"][31]["layout"]=="thanks"
assert d["slides"][32]["section"]=="Appendix navigation"
assert len(d["iterations"])==20
assert d['content_version']=='v21'
assert len(d['facts'])==41 and len(d['claims'])==131 and len(d['sources'])==30
assert collections.Counter(f['verification_status'] for f in d['facts'])=={'Supported':22,'Qualified':14,'Blocked':5}
assert {f['id'] for f in d['facts'] if f['verification_status']=='Blocked'}=={'F08','F09','F10','F11','F16'}
source_ids={s['id'] for s in d['sources']}
for c in d['claims']: assert set(c['sources']) <= source_ids
assert 'manashdeori09@gmail.com' in d['slides'][31]['body']
print("Arithmetic, sequence, version, contact and reference checks passed. Five original passages remain pending verification.")
