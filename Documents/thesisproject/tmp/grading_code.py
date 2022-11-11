import os
import json
import ast
from cognitive_complexity.api import get_cognitive_complexity

process = os.popen('multimetric tmp/submission.py')
preprocessed = process.read()
process.close

process_two = os.popen('pylint tmp/submission.py')
preprocessed_two = process_two.read()
process_two.close

with open('tmp/submission.py', 'r') as f:
    file_list = f.readlines()

file_contents = ''.join(file_list)
# print(file_contents)
tryout = ast.parse(file_contents).body[0]
cognitive_result = get_cognitive_complexity(tryout)
preprocessed_two_split_list = preprocessed_two.splitlines()
target_line_two = preprocessed_two_split_list[7]
print('Total score of your code: ', target_line_two)
print('The cognitive complexity is:{}'.format(cognitive_result) + "\n")
json_data = json.loads(preprocessed)

find_loc = json_data.get('overall', {}).get('loc')
find_vocab = json_data.get('overall', {}).get('halstead_volume')
find_conflow = json_data.get('overall', {}).get('cyclomatic_complexity')
#find_dataflow = get_cognitive_complexity(tryout)

#print(type(json_data))

print("The LOC is:" + str(find_loc) + "\n")
print("The Halstead Volume is: " + str(find_vocab) + "\n")
print("The Cyclomatic Complexity is: " + str(find_conflow) + "\n")


target_line = preprocessed_two_split_list[1]
target_line_split_list = target_line.split(':')

print('linenum:{}, warning_id:{}, warning_message:{}'.format(target_line_split_list[1], target_line_split_list[3], target_line_split_list[4]))
