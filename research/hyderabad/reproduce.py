import json,pathlib
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
print("All arithmetic, sequence and version-count checks passed.")
